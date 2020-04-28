import {shallow, mount} from 'enzyme'
import React from 'react'
import SkeletonBlock from './index.jsx'
const skeletonBlockClass = '.skeleton-block'

test('SkeletonBlock renders without errors', () => {
    const wrapper = mount(<SkeletonBlock />)
    expect(wrapper.length).toBe(1)
})

test('SkeletonBlock renders with correct height', () => {
    const wrapper = shallow(<SkeletonBlock height="100px" />)
    expect(wrapper.find(skeletonBlockClass).prop('style').height).toBe('100px')
})

test('SkeletonBlock renders with correct custom styles', () => {
    const wrapper = shallow(<SkeletonBlock height="100px" style={{borderRadius: '100%'}} />)
    expect(wrapper.find(skeletonBlockClass).prop('style').borderRadius).toBe('100%')
})

test('SkeletonBlock renders with correct element', () => {
    const wrapper = shallow(<SkeletonBlock type="h1" />)
    expect(wrapper.find(skeletonBlockClass).is('h1')).toBe(true)
})
