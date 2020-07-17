import { shallowMount } from '@vue/test-utils';
import Loader from '@/components/Loader.vue';

describe('Loader.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Loader, {
      propsData: {
        show: true
      }
    });
    const div = wrapper.find('div.loader-wrapper');
    expect(div.exists()).toBe(true);
  });
  it('does not render when no props are passed', () => {
    const wrapper = shallowMount(Loader);
    const div = wrapper.find('div.loader-wrapper');
    expect(div.exists()).toBe(false);
  });
});
