import {mount} from 'enzyme'
import React from 'react'
import {ColorPicker, DateRangePicker, ItemColorPicker, ItemPicker, Table} from './index.js'

describe('Basic test to check all components have no errors mounting', () => {
    test('ColorPicker renders without errors', () => {
        const wrapper = mount(<ColorPicker />)
        expect(wrapper.length).toBe(1)
    })
    test('DateRangePicker renders without errors', () => {
        const wrapper = mount(<DateRangePicker />)
        expect(wrapper.length).toBe(1)
    })
    test('ItemColorPicker renders without errors', () => {
        const wrapper = mount(<ItemColorPicker items={['Canada', 'China']} />)
        expect(wrapper.length).toBe(1)
    })

    test('ItemPicker renders without errors', () => {
        const wrapper = mount(<ItemPicker items={['Canada', 'China']} />)
        expect(wrapper.length).toBe(1)
    })

    test('Table renders without errors', () => {
        const columns = [
            {id: 'column1', label: 'Column 1'},
            {id: 'column2', label: 'Column 2'}
        ]

        const rows = [{column1: 'a', column2: 'aa'}, {column1: 'b', column2: 'bb'}]
        const wrapper = mount(<Table rows={rows} columns={columns} />)
        expect(wrapper.length).toBe(1)
    })
})



