import { TestBed, async } from '@angular/core/testing';
import { CattleListing } from './cattle-listing';

describe('CattleListing', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CattleListing
      ],
    }).compileComponents();
  }));

  it('should create the CatteListing page', () => {
    const fixture = TestBed.createComponent(CattleListing);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
