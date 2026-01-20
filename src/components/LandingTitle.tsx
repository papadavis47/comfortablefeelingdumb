'use client'

import { TypewriterText } from './TypewriterText'

function LandingTitle(): React.JSX.Element {
  return (
    <div className="text-strongest">
      <h1 className="bg-linear-to-r from-headings to-secondary bg-clip-text pb-2 text-5xl font-extrabold tracking-tighter text-transparent md:text-center lg:text-7xl">
        Comfortable Feeling Dumb
      </h1>
      <h2 className="py-4 text-xl font-bold text-secondary opacity-75 md:text-center lg:text-3xl">
        <TypewriterText
          text="A blog about software engineering "
          delay={0.3}
          staggerDuration={0.12}
        />
        <TypewriterText
          text="( and trail running )"
          delay={5.0}
          staggerDuration={0.05}
          className="italic"
        />
      </h2>
    </div>
  )
}

export default LandingTitle
