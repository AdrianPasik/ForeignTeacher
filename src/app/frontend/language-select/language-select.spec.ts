import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { LanguageSelect } from './language-select';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('LanguageSelect', () => {
    let component: LanguageSelect;
    let fixture: ComponentFixture<LanguageSelect>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LanguageSelect],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(LanguageSelect);
        component = fixture.componentInstance;
        httpMock = TestBed.inject(HttpTestingController);
        await fixture.whenStable();
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create', () => {
        const req = httpMock.expectOne('/vocabulary/plde.txt');
        expect(req.request.method).toBe('GET');
        const mockData = `
    1
    a|b`;
        req.flush(mockData);

        expect(component).toBeTruthy();
    });
});
