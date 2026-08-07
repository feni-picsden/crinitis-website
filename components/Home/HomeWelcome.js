
import Link from 'next/link'
export default function Hero() {

  return (
    <>
      <section id="our_story" className="pad">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content_bx">
                <h2 className="title">Ciao amore
                  <span className="sign">Welcome!</span>
                </h2>
                <div className="space40"></div>
                <p className="para">
                  Criniti&apos;s serves the best-woodfired pizza, ribs, pasta, seafood, grilled fish, bruschetta, risotto, and more for lunch and dinner. The best Southern Italian and contemporary Australian cuisine are combined to bring you a delicious range of authentic Italian flavors in Sydney, Melbourne, and Perth.
                  <br></br><br></br>
                  Criniti&apos;s is an ideal venue to celebrate any occasion with family and friends; we are the perfect event location for your function. Best wood fire pizza in town! Our famous 1mts, 2mts, and 3mts pizzas are woodfired to perfection using our secret recipe dough and only the freshest ingredients.
                  The menu also features authentic Italian antipasti and ribs, steaks, burgers, gourmet salads, great cocktails, and an impressive selection of wines. And, of course, no meal at Criniti&apos;s would be complete without one of our authentic Italian classic desserts.
                  <br></br><br></br>
                  Whether you&apos;re looking for a quick bite or a leisurely meal, Criniti&apos;s has something to suit everyone. So come on in and enjoy the best of Italy right here in Australia!
                </p>

                <Link legacyBehavior href="/about">
                  <a className="vw_menu">
                    More about Criniti&apos;s
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}