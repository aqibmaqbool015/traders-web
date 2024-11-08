import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

export const RatingStar = () => {
    const [rating, setRating] = useState(0)

    // Update rating on star click
    const handleRating = (rate) => {
        // If the rating is the same as the clicked one, reset to 0 (for deselection)
        setRating(prevRating => (prevRating === rate ? 0 : rate))
    }

    return (
        <div className='!mt-1'>
            <Rating
                onClick={handleRating}
                ratingValue={rating} // Controlled rating value
                initialValue={0} // Start with no rating
                size={30} // Adjust size as needed
                fillColor="orange" // Star fill color after click
                emptyColor="transparent" // Empty star background
                allowHover={false} // Disable hover effect to prevent filling multiple stars
                className='flex custom-rating'
            />
        </div>
    )
}
