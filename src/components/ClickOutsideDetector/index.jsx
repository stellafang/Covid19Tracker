import {useState, useEffect, useRef} from 'react'

/**
 * This component allows detection of a user click outside or inside component.
 * This is tailored to components you want to close when a user clicks anywhere outside the component. 
 * 
 * `useComponentVisible` takes in an boolean that represents if your component should be visible currently.
 * The component returns:
 * 1) a `ref` you can use to reference your component.
 * 2) `isComponentVisible` to know if a click occurred outside the component.
 * 3) `setComponentVisible` to set whether the component is visible or not.
 */
const useComponentVisible = (initialIsVisible) => {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
    const ref = useRef(null)

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    })

    return {ref, isComponentVisible, setIsComponentVisible}
}

export default useComponentVisible