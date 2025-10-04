import React from 'react'
// import FooterComponent from './footer.component';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);



function PresentSectionComponent() {
    const containerRef = React.useRef(null);
    const headingRef = React.useRef(null);

    // GSAP Animation
    const gsapRef = useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                toggleActions: "play none none reverse",
                pin: true,
                anticipatePin: 1,
                pinSpacing: false,
                scrub: 2,
                // markers: true,
            }
        })

        tl.fromTo(headingRef.current, 
            { scale: 1, opacity: 1 }, 
            { scale: 4, opacity: 0, ease: "power4.out" }
        )

        return () => {
            tl.kill()
        }
    }, [])




    return (
        <>
            <section ref={containerRef} className="h-screen w-full flex items-center justify-center pointer-events-none">
                <h1 ref={headingRef} className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black font-google-sans ">PRMITR PRESENTS</h1>
            </section>
            
        </>
    )
}

export default PresentSectionComponent