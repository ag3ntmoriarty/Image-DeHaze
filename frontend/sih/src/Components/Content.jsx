import React from 'react'

export default function Content({ setSelectedOption }) {
  return (
    <div>
      <strong>
        <h2>
            <i>Options Offered:</i>
        </h2>
      </strong>

      <ol >
        <li>
        <button onClick={() => setSelectedOption('live')}>Live Feed</button>
        </li>
        <li>
        <button onClick={() => setSelectedOption('video')}>Video Upload</button>
        </li>
      </ol>
    </div>
  )
}
