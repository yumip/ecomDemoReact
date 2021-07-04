import React from "react";
import styled from "styled-components";

const ProductPreviewStyles = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    h3, p {
        color: var(--dark-grey);
        margin: 0;
    }
    
    h3 {
        font-size: 21px;
        margin-top: 10px;
    }

    p {
        margin-bottom: 10px;
    }
    

    img {
        align-self: center;
        max-height: 70%;
        height: auto;
        width: 100%;
        object-fit: contain;
        flex: 1;
    }
`;

export default function ProductPreview({ image, title, phraseNum }) {

    const previewPhrases = [
        "Best seller",
        "Discover",
        "Stock up now",
        "New releases",
        "Sale now on",
        "Check this out",
        "Recently viewed"
    ];

    return (
        <ProductPreviewStyles>
                <h3>
                    {previewPhrases[Math.floor(Math.random() * 6)]}
                </h3>
                <img src={image} alt={title} />
                <p>Shop now</p>
        </ProductPreviewStyles>
    )
}