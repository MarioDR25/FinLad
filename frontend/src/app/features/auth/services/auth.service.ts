import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RegisterDto, LoginDto, GoogleLoginDto, AuthResponseDto, GoogleResponse } from '../auth.model';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../../../core/services/storage.service';
import { Router } from '@angular/router';
import { FinanceDataService } from '../../../core/services/finance-data.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private http = inject(HttpClient);
  private storage = inject(StorageService);
  private dashboardSvc = inject(FinanceDataService);
  
  private token = signal<string | null>(this.storage.get('token'));
  public isAuthenticated = computed(() => !!this.token());

  constructor() {
    this.initializeGoogle();
  }
  
  register(dto: RegisterDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${environment.apiUrl}/auth/register`, dto).pipe(
      tap((res: AuthResponseDto) => {
        this.storage.set('token', res.token!);
        this.storage.set('user', res.name!)
        this.token.set(res.token!)
      })
    )
  }

  login(dto: LoginDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${environment.apiUrl}/auth/login`, dto).pipe(
      tap((res: AuthResponseDto) => {
        this.storage.set('token', res.token!);
        this.storage.set('user', res.name!)
        this.token.set(res.token!)
      })
    )
  }

  googleLogin(idToken: string): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${environment.apiUrl}/auth/google`, { idToken }).pipe(
      tap((res: AuthResponseDto) => {
        this.storage.set('token', res.token!);
        this.storage.set('user', res.name!)
        this.token.set(res.token!)
      })
    )
  }

  initGoogleLogin() {
    window.google?.accounts.id.prompt();
  }

  private initializeGoogle() {
    window.google?.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response) => this.handleGoogleResponse(response),
    });
  }

  private handleGoogleResponse(response: GoogleResponse) {
    const credential = response.credential;
    if (!credential) return;

    this.googleLogin(credential).subscribe({
      next: () => this.router.navigate(['/dashboard'], { replaceUrl: true }),
      error: () => {},
    });
  }

  logout(): void {
    this.storage.remove('token');
    this.storage.remove('user');
    this.token.set(null);
    this.router.navigate(['/auth/login']);
    this.dashboardSvc.disconnect(); 
  }
}
