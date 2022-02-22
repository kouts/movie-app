import { shallowMount } from '@vue/test-utils'
import MovieReviews from '@/components/MovieReviews.vue'
import { reviews } from './data/movies'

describe('MovieReviews.vue', () => {
  it('correctly renders reviews', () => {
    const wrapper = shallowMount(MovieReviews, {
      propsData: {
        reviews
      }
    })
    const navPills = wrapper.findAll('.nav-pills')
    const tabPanes = wrapper.findAll('.tab-pane')
    expect(navPills.length).toBe(reviews.length)
    expect(tabPanes.length).toBe(reviews.length)
  })
  it('correctly renders reviews when a limit is passed', () => {
    const limit = 2
    const wrapper = shallowMount(MovieReviews, {
      propsData: {
        reviews,
        reviewsToShow: limit
      }
    })
    const navPills = wrapper.findAll('.nav-pills')
    const tabPanes = wrapper.findAll('.tab-pane')
    expect(navPills.length).toBe(limit)
    expect(tabPanes.length).toBe(limit)
  })
  it('renders a not found message when no reviews are passed', () => {
    const wrapper = shallowMount(MovieReviews)
    const navPills = wrapper.findAll('.nav-pills')
    const tabPanes = wrapper.findAll('.tab-pane')
    expect(navPills.exists()).toBe(false)
    expect(tabPanes.exists()).toBe(false)
    expect(wrapper.find('div > div').text()).toBe('No reviews found')
  })
})
