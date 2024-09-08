import React from 'react'

export default function TechStack({skills}) {
    return (
        <div className="grid grid-cols-3 gap-3 py-[24px] md:grid-cols-5">
            {skills.map((x, i) => (<div className="flex items-center justify-center" key={i}>
                <div className="h-[50px] w-[50px] md:h-[70px] md:w-[70px]">
                    <img
                        src={x}
                        alt={i}
                        style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            // border:'2px solid #0095ff'
                        }}
                    />
                    {/* <div className="flex justify-center">
                        <p className="mt-[5px] text-sm font-semibold text-secondary">{x.name}</p>
                    </div> */}
                </div>
            </div>))}
        </div>
    )
}
