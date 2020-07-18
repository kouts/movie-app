import { shallowMount } from '@vue/test-utils';
import MovieTrailer from '@/components/MovieTrailer.vue';

describe('MovieTrailer.vue', () => {
  it('renders a youtube iframe when a video id is passed', () => {
    const videoId = 'eyzxu26-Wqk';
    const wrapper = shallowMount(MovieTrailer, {
      propsData: {
        videoId
      }
    });
    const iframe = wrapper.find('iframe');
    expect(iframe.exists()).toBe(true);
    expect(iframe.attributes().src).toBe(`https://www.youtube.com/embed/${videoId}?rel=0`);
  });
  it('renders a not available image when no video id is passed', () => {
    const wrapper = shallowMount(MovieTrailer);
    const iframe = wrapper.find('iframe');
    const image = wrapper.find('img[alt="Trailer not available"]');
    expect(iframe.exists()).toBe(false);
    expect(image.exists()).toBe(true);
  });
});
