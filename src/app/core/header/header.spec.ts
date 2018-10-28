import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';

import * as fromRoot from 'src/app/store/app.reducers';
import * as authActions from 'src/app/auth/store/auth.actions';
import * as recipeActions from 'src/app/recipes/store/recipe.actions';
import { LOGOUT } from 'src/app/auth/store/auth.actions';
import * as authApiGateway from 'src/app/auth/auth-api-gateway';
import { HeaderComponent } from './header.component';
import { DebugElement, Predicate } from '@angular/core';

describe('HeaderComponent', () => {
  let store: Store<fromRoot.AppState>;
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
        })
      ],
      declarations: [
        HeaderComponent,
      ],
    });

    store = TestBed.get(Store);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  }));

  function getElementByText(re: RegExp): DebugElement {
    return fixture.debugElement.query((debugEl: DebugElement) => {
      const childNodes = Array.from(debugEl.nativeElement.childNodes);
      return childNodes.some((node: Text) => re.test(node.wholeText));
    });
  }

  function createHeader() {
    return {
      controls: {
        signout: getElementByText(/sign out/i),
        fetchData: getElementByText(/fetch data/i),
        saveData: getElementByText(/save data/i),
      },
      links: {
        register: getElementByText(/register/i),
        signin: getElementByText(/sign in/i),
      }
    };
  }

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when user is logged in', () => {
    let header;

    beforeEach(() => {
      store.dispatch(new authActions.Signin());
      fixture.detectChanges();
      header = createHeader();
    });

    it('should render a "Sign Out" control', () => {
      expect(header.controls.signout).toBeTruthy();
    });

    it('should render "Save Data" control', () => {
      expect(header.controls.saveData).toBeTruthy();
    });

    it('should render "Fetch Data" control', () => {
      expect(header.controls.fetchData).toBeTruthy();
    });

    it('should dispatch SaveRecipes on "Save Data" click', () => {
      header.controls.saveData.triggerEventHandler('click', null);

      const calledWith = dispatchSpy.calls.mostRecent().args[0];
      expect(calledWith).toEqual(jasmine.any(recipeActions.SaveRecipes));
    });

    it('should dispatch FetchRecipes on "Fetch Data" click', () => {
      header.controls.fetchData.triggerEventHandler('click', null);

      const calledWith = dispatchSpy.calls.mostRecent().args[0];
      expect(calledWith).toEqual(jasmine.any(recipeActions.FetchRecipes));
    });

    it('should dispatch FetchRecipes on "Fetch Data" click', () => {
      header.controls.signout.triggerEventHandler('click', null);

      const calledWith = dispatchSpy.calls.mostRecent().args[0];
      expect(calledWith).toEqual(jasmine.any(authActions.Logout));
    });

    it('should not render a "Register" link', () => {
      expect(header.links.register).toBeNull();
    });

    it('should not render "Sign In" link', () => {
      expect(header.links.signin).toBeNull();
    });
  });

  describe('when user is not logged in', () => {
    let header;
    beforeEach(() => {
      store.dispatch(new authActions.Logout());
      fixture.detectChanges();
      header = createHeader();
    });

    it('should render "Register" routerLink', () => {
      const { routerLink } = header.links.register.attributes;
      expect(routerLink).toBe('/signup');
    });

    it('should render "Sign In" routerLink', () => {
      const { routerLink } = header.links.signin.attributes;
      expect(routerLink).toBe('/signin');
    });

    it('should not render a "Sign Out" control', () => {
      expect(header.controls.signout).toBeNull();
    });

    it('should not render "Save Data" control', () => {
      expect(header.controls.saveData).toBeNull();
    });

    it('should not render "Fetch Data" control', () => {
      expect(header.controls.fetchData).toBeNull();
    });
  });
});
