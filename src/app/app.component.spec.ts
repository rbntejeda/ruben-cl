import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

type TestableAppComponent = AppComponent & {
  toggleTheme(): void;
};

function createMediaQueryList(matches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();

  const mediaQuery = {
    matches,
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addEventListener: vi.fn(
      (_type: string, listener: (event: MediaQueryListEvent) => void) => {
        listeners.add(listener);
      }
    ),
    removeEventListener: vi.fn(
      (_type: string, listener: (event: MediaQueryListEvent) => void) => {
        listeners.delete(listener);
      }
    ),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn()
  } as unknown as MediaQueryList;

  return {
    mediaQuery,
    emit(matchesDarkTheme: boolean) {
      Object.defineProperty(mediaQuery, 'matches', {
        configurable: true,
        value: matchesDarkTheme
      });
      const event = { matches: matchesDarkTheme } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    }
  };
}

describe('AppComponent', () => {
  let themeColorMeta: HTMLMetaElement;

  beforeEach(async () => {
    themeColorMeta = document.createElement('meta');
    themeColorMeta.name = 'theme-color';
    document.head.appendChild(themeColorMeta);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  afterEach(() => {
    themeColorMeta.remove();
    vi.restoreAllMocks();
  });

  it('renders the main professional profile content', () => {
    const { mediaQuery } = createMediaQueryList(true);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQuery);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent as string;
    expect(content).toContain('Ruben Eduardo Tejeda Roa');
    expect(content).toContain('Construyo software confiable');
    expect(content).toContain('Stack y competencias');
  });

  it('opens and closes the mobile navigation', () => {
    const { mediaQuery } = createMediaQueryList(true);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQuery);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const menuButton = fixture.nativeElement.querySelector(
      '.mobile-menu-button'
    ) as HTMLButtonElement;
    menuButton.click();
    fixture.detectChanges();

    expect(menuButton.getAttribute('aria-expanded')).toBe('true');
    const mobileLink = fixture.nativeElement.querySelector(
      '.mobile-nav a'
    ) as HTMLAnchorElement;
    expect(mobileLink).not.toBeNull();

    mobileLink.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mobile-nav')).toBeNull();
  });

  it('tracks system theme changes and updates the browser theme color', () => {
    const { mediaQuery, emit } = createMediaQueryList(true);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQuery);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('light-theme')).toBe(false);
    expect(themeColorMeta.content).toBe('#101827');

    emit(false);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('light-theme')).toBe(true);
    expect(themeColorMeta.content).toBe('#f8fafc');
  });

  it('toggles the selected theme and removes its media query listener', () => {
    const { mediaQuery } = createMediaQueryList(true);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQuery);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    (fixture.componentInstance as TestableAppComponent).toggleTheme();
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('light-theme')).toBe(true);
    expect(themeColorMeta.content).toBe('#f8fafc');

    fixture.destroy();

    expect(mediaQuery.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });
});
