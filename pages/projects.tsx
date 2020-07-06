import React from "react"

export default () => {
  return (
      <>
      <div className="pa3">
        <h1>Projects</h1>
        <div className="fl w-30-ns">
          <img src="/images/lets-garden-app-journal-screen.png" alt="Let's Garden app journal entry screen" />
        </div>
        <div className="fl w-70-ns">
          <h3>Let's Garden app for iOS and Android</h3>
          <h4>The Challenge</h4>
          <p>
            Gardening is one of my favorite hobbies. I love the calm of the
            outdoors. I love the relentless force of nature to survive and
            change and continue to show us new wonders. I also, love the
            learning aspect of gardening, of how to work with nature to produce
            its best results.
          </p>
          <p>
            Unfortunately, I've have had a difficult time finding a quality
            journal app for keeping track of what I'm growing and what I've
            learned over the seasons.
          </p>
          <h4>The Result</h4>
          <p>
            I use{" "}
            <a href="https://facebook.github.io/react-native/">React Native</a>{" "}
            a lot in my full-time work, and I hadn't used the{" "}
            <a href="https://expo.io/">Expo</a> flavor of React Native before
            this project, so I decided to experiment using Expo.
          </p>
          <p>
            Expo was great in the beginning to get me started quickly, but over
            time some things started to slow me down. After a while of fighting
            through these things, I decided to convert over to a straight-up
            React Native project.  To check the app out, visit the{" "}
            <a href="https://letsgarden.app/">Let's Garden website</a>.
          </p>
           
        </div>
        <div className={`fl w-100`}>
          <div className="fl w-30-ns">
            <img src="/images/minhub-youth-events-screenshot.png" alt="Minhub Youth app events screen" />
          </div>
          <div className="fl w-70-ns">
            <h3>Minhub Youth app for iOS and Android</h3>
            <h4>The Challenge</h4>
            <p>
              The founder of Magic Makrs had an iOS app for youth pastors called{" "}
              <a href="https://minhubapp.com/">Minhub Youth</a>, which he wanted
              to have built out for Android as well. With this app, youth
              pastors could organize and keep track of their student and
              ministry events. The previous app was written in Objective-C with
              data persistence in Core Data, which synced over the Dropbox API.
              When he found out that API was going to be shut down, he came to
              me for a new solution.
            </p>
            <h4>The Result</h4>
            <p>
              The two main use cases of the app are as a local database used in
              offline mode and, conversely, a synced database that multiple
              users interact with in real-time. With these uses in mind, we
              decided on using the{" "}
              <a href="https://realm.io/products/realm-database/">
                Realm offline-first database
              </a>{" "}
              within a React Native app.
            </p>
            <p>
              The app makes use of a local database for users who only need to
              use the app on one device. For users who need to track event
              attendance across multiple devices, their data gets synced through
              a{" "}
              <a href="https://realm.io/products/realm-platform">Realm Cloud</a>{" "}
              database.
            </p>
          </div>
        </div>
      </div>
      <div className="cf" />
      </>
  )
}