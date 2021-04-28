import React from 'react'

export function splitLine(text) {
    return text.split('\n').map((item, key) => {
        return <span key={key}>{item}<br /></span>
    })
}

export function trimText(text, length) {
    if (text.length > length) {
      return text.substring(0, length) + "..."
    } else {
        return text
    }
}
