import { renderHook, act } from "@testing-library/react-hooks";
import { useGoogleMaps } from "..";

const mapObject = { map: "object" };
const googleMock = {
  maps: {
    Map: jest.fn().mockImplementation(() => mapObject)
  }
};
const windowMock = { ...window, google: googleMock };
const loadEvent = new Event("load");
const mapOptions = {};

describe("useMap hook", () => {
  it("should return expected values", () => {
    // given
    const windowSpy = jest.spyOn(global as any, "window", "get");

    // when
    const { result } = renderHook(() =>
      useGoogleMaps("GOOGLE_MAPS_API_KEY", mapOptions)
    );
    act(() => {
      windowSpy.mockImplementation(() => windowMock);
      document.querySelectorAll("script")[0].dispatchEvent(loadEvent);
    });

    // then
    expect(document.querySelectorAll("script")[0].getAttribute("src")).toBe(
      "https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAPS_API_KEY"
    );
    expect(result.current.google).toBe(googleMock);
    expect(result.current.map).toBe(mapObject);
    expect(result.current.ref.current).toBe(null);

    // cleanup
    windowSpy.mockRestore();
  });
});
