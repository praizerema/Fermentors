

import React, {createContext, useContext, useState} from 'react';
import PropTypes from 'prop-types';

export const PageContext = createContext();

export const PageProvider = ({children}) => {
    const [isPageLoading, setPageLoading] = useState(false);
    const [isPageError, setPageError] = useState(false);
    const [isPageSuccess, setPageSuccess] = useState(false);
    const [messageContent, setMessage] = useState('');

    return (
        <PageContext.Provider value={{isPageLoading, setPageLoading,
            isPageError, setPageError,
            isPageSuccess, setPageSuccess,
            messageContent, setMessage}}
        >
            {children}
        </PageContext.Provider>
    )
};

export const usePageValue = () => useContext(PageContext);

PageProvider.propTypes = {
    children: PropTypes.node.isRequired
}