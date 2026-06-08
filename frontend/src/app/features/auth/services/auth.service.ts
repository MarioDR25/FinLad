import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RegisterDto, LoginDto, AuthResponseDto } from '../auth.model';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../../../core/services/storage.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly router = inject(Router);
  private storage = inject(StorageService);
  
  private _token = signal<string | null>(this.storage.get('token'));
  public isAuthenticated = computed(() => !!this._token());
  
  register(dto: RegisterDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${environment.apiUrl}/auth/register`, dto).pipe(
      tap((res: AuthResponseDto) => {
        this.storage.set('token', res.token!);
        this.storage.set('user', res.name!)
        this._token.set(res.token!)
      })
    )
  }

  login(dto: LoginDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${environment.apiUrl}/auth/login`, dto).pipe(
      tap((res: AuthResponseDto) => {
        this.storage.set('token', res.token!);
        this.storage.set('user', res.name!)
        this._token.set(res.token!)
      })
    )
  }

  logout(): void {
    this.storage.remove('token');
    this.storage.remove('user');
    this._token.set(null);
    this.router.navigate(['/auth/login']);
  }
} 
