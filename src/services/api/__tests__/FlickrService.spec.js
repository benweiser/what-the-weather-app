import mockAxios from "axios";
import API from "../../api";
import { API_CONFIG, getRandomFlickrPhoto } from "../FlickrService";

describe("Flickr Service", () => {
  let mockConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfig = API_CONFIG;
  });

  it("should get flickr photo by coords", () => {
    API.getFlickrPhotosByCoords(36.1699, 115.1398, "Las Vegas");
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `?method=flickr.photos.search&lat=36.1699&lon=115.1398&text=Las%20Vegas%20skyline`,
      mockConfig
    );
  });

  it("should not call axios if lat or lon is not passed", () => {
    API.getFlickrPhotosByCoords(123);
    expect(mockAxios.get).toHaveBeenCalledTimes(0);
  });

  it("should get a random photo from flickr", () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 1;
    global.Math = mockMath;

    const mockPhotoData = [
      {
        farm: 8,
        id: "39780251183",
        isfamily: 0,
        isfriend: 0,
        ispublic: 1,
        owner: "151639852@N07",
        secret: "9d6062cb2d",
        server: "7871",
        title: "2015-03-24_16-05-26_ILCE-6000_DSC00995"
      },
      {
        farm: 7,
        id: "39780251182",
        isfamily: 0,
        isfriend: 0,
        ispublic: 1,
        owner: "151639852@N06",
        secret: "9d6062cb2e",
        server: "7870",
        title: "2014-03-24_16-05-26_ILCE-6000_DSC00995"
      }
    ];
    expect(getRandomFlickrPhoto(mockPhotoData)).toEqual(
      "https://farm7.staticflickr.com/7870/39780251182_9d6062cb2e_b.jpg"
    );
  });
});
