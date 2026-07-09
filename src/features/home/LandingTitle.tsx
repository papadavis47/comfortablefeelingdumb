'use client'

import { TypewriterText } from './TypewriterText'

function LandingTitle(): React.JSX.Element {
  return (
    <div className="text-heading">
      <h1 className="bg-linear-to-r from-accent to-accent-2 bg-clip-text pb-2 text-display-sm lg:text-display text-transparent md:text-center">
        Comfortable Feeling Dumb
      </h1>
      <h2 className="py-4 text-xl font-medium text-fg-muted md:text-center lg:text-2xl">
        <TypewriterText
          text="A blog about software engineering "
          delay={0.3}
          staggerDuration={0.12}
        />
        <TypewriterText
          text="( and trail running )"
          delay={5.0}
          staggerDuration={0.05}
          className="italic bg-linear-to-r from-accent to-accent-2 bg-clip-text text-transparent"
        />
      </h2>
    </div>
  )
}

export default LandingTitle
