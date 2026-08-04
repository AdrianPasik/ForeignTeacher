import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('App', () => {
    let httpMock: HttpTestingController;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [App],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        const req = httpMock.expectOne('/vocabulary/plde.txt');
        expect(req.request.method).toBe('GET');
        const mockData = `
    1
    a|b`;
        req.flush(mockData);
        expect(app).toBeTruthy();
    });
});
