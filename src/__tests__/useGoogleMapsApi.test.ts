import { renderHook, act } from "@testing-library/react-hooks";
import { useGoogleMapsApi } from "../";

const googleMock = {};
const windowMock = { ...window, google: googleMock };
const loadEvent = new Event("load");

describe("useGoogleMapsApi hook", () => {
  it("should load Javascript Google Maps API", () => {
    // given
    const windowSpy = jest.spyOn(global as any, "window", "get");

    // when
    const { result } = renderHook(() =>
      useGoogleMapsApi("GOOGLE_MAPS_API_KEY"),
    );
    act(() => {
      windowSpy.mockImplementation(() => windowMock);
      document.querySelectorAll("script")[0].dispatchEvent(loadEvent);
    });

    // then
    expect(document.querySelectorAll("script")[0].getAttribute("src")).toBe(
      "https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAPS_API_KEY",
    );
    expect(result.current).toBe(googleMock);

    // cleanup
    windowSpy.mockRestore();
  });

  it("should not load Google Maps API more than once after re-render", async () => {
    // given
    const windowSpy = jest.spyOn(global as any, "window", "get");

    // when
    const { result, rerender } = renderHook(() =>
      useGoogleMapsApi("GOOGLE_MAPS_API_KEY"),
    );
    act(() => {
      windowSpy.mockImplementation(() => windowMock);
      document.querySelectorAll("script")[0].dispatchEvent(loadEvent);
    });
    const firstRender = result.current;
    rerender();
    act(() => {
      windowSpy.mockImplementation(() => windowMock);
      document.querySelectorAll("script")[0].dispatchEvent(loadEvent);
    });
    const secondRender = result.current;

    // then
    expect(firstRender).toBe(secondRender);

    // cleanup
    windowSpy.mockRestore();
  });

  describe("should not add more than one script tag with same API KEY", () => {
    it("after load event is fired", async () => {
      // given
      const windowSpy = jest.spyOn(global as any, "window", "get");

      // when
      renderHook(() => useGoogleMapsApi("GOOGLE_MAPS_API_KEY"));
      act(() => {
        windowSpy.mockImplementation(() => windowMock);
        document.querySelectorAll("script")[0].dispatchEvent(loadEvent);
      });
      renderHook(() => useGoogleMapsApi("GOOGLE_MAPS_API_KEY"));
      act(() => {
        windowSpy.mockImplementation(() => windowMock);
        document.querySelectorAll("script")[0].dispatchEvent(loadEvent);
      });

      // then
      expect(document.querySelectorAll("script").length).toBe(1);

      // cleanup
      windowSpy.mockRestore();
    });

    it("before load event is fired", async () => {
      // given
      const windowSpy = jest.spyOn(global as any, "window", "get");

      // when
      renderHook(() => useGoogleMapsApi("GOOGLE_MAPS_API_KEY"));
      renderHook(() => useGoogleMapsApi("GOOGLE_MAPS_API_KEY"));
      act(() => {
        windowSpy.mockImplementation(() => windowMock);
        document.querySelectorAll("script")[0].dispatchEvent(loadEvent);
      });

      // then
      expect(document.querySelectorAll("script").length).toBe(1);

      // cleanup
      windowSpy.mockRestore();
    });
  });
});
