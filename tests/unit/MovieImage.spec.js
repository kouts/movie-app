import { shallowMount } from '@vue/test-utils';
import MovieImage from '@/components/MovieImage.vue';

describe('MovieImage.vue', () => {
  it('renders an image when path is passed', () => {
    const wrapper = shallowMount(MovieImage, {
      propsData: {
        path: '/AsdB9A2XGalCZVjlyG9tRf03IfW.jpg',
        posterClass: 'image'
      }
    });
    const image = wrapper.find('img.image');
    const noImage = wrapper.find('img[alt="Poster not available"]');
    expect(image.exists()).toBe(true);
    expect(noImage.exists()).toBe(false);
  });
  it('renders a not available image when no path is passed', () => {
    const wrapper = shallowMount(MovieImage);
    const image = wrapper.find('img.image');
    const noImage = wrapper.find('img[alt="Poster not available"]');
    expect(image.exists()).toBe(false);
    expect(noImage.exists()).toBe(true);
  });
});
