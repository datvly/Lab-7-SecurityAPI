import React from 'react';

const Section = ({ title, content, children }) => {
    return (
        <section>
            <h2>{title}</h2>
            {content && <p>{content}</p>}
            {children}
        </section>
    );
};

export default Section;
