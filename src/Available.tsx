
import patterns from './patterns.json';

function Available({available, unavailable, add}) {

    let featureMap = new Map<string, any>();

    patterns.map(p =>
        p.pattern.features.map(
            f => {
                featureMap.set(f, p.pattern.title);
            }
        )
    );
    console.log(featureMap);

    if (available.length == 0 && unavailable.length == 0) return null;

    return (
        <div className="card">

            <h2>Available</h2>

            <div className="selection-box">

                {
                    available.map(n => (
                        <div
                            className="selection-field"
                            key={n.pattern.name}
                        >
                            <div>{n.pattern.title}</div>
                            <button onClick={() => add(n.pattern.name)}>
                                add
                            </button>
                        </div>
                    ))
                }

                {
                    unavailable.map(n => (
                        <div
                            className="selection-field"
                            key={n.pattern.name}
                        >
                            <div>{n.pattern.title}</div>
                            <div>
                            {

                                n.pattern.requires.map(
                                    p => (
                                        <span
                                            className="dep"
                                           key={p}
                                        >
                                            needs {p}
                                        </span>
                                    )
                                )


                            }
                            </div>
                        </div>
                    ))
                }

            </div>


        </div>
    );

}

export default Available;

