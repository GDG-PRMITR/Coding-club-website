
export default function AboutPage() {
	 return (
		 <div className="relative min-h-screen bg-white text-foreground overflow-x-hidden">
			 <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none" style={{filter: 'blur(1px)'}}>
				 <GoogleParticlesCanvas />
			 </div>
			 <main className="py-12 px-4 flex flex-col items-center">
				 {/* Frame 1: Coding Club heading, Vision and Mission as 2 grid boxes, description below */}
				<section className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 mb-12 flex flex-col items-center border border-gray-300">
					<h1 className="text-5xl font-bold mb-8 text-center flex items-center justify-center gap-4">
						<img src="/Coding-Club.png" alt="Coding Club Logo" className="w-12 h-12 inline-block" />
						Coding Club
					</h1>
					 <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
						<div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-blue-400">
							<h1 className="text-3xl font-bold mb-4"> Vision</h1>
							 <p className="text-lg text-gray-700 text-center">
								 “A thriving ecosystem of coders,
united by Synergy, Trust, and Passion.
Where ideas turn into innovation,
collaboration fuels creativity,
and technology serves humanity.
Our vision is to inspire learners,
empower leaders,
and shape a digital future with pride for our nation.”
							 </p>
						 </div>
						<div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-blue-400">
							<h2 className="text-3xl font-bold mb-4"> Mission</h2>
							 <p className="text-md text-gray-800 text-center">
								 “To emerge as a Centre of Excellence in coding and technology,
guided by Synergy, Trust, and Passion.
We envision nurturing problem-solvers and innovators,
empowering students with future-ready skills,
fostering collaboration and creativity,
building a community that inspires and uplifts,
driving impactful projects for society,
and contributing to national growth in the global arena.”
							 </p>
						 </div>
					 </div>
					 <div className="w-full mt-2 text-center">
						 <p className="text-base text-gray-600">
							 GDG Coding Club is dedicated to building a vibrant community for tech enthusiasts. We organize workshops, hackathons, and events to empower students and professionals to learn, collaborate, and innovate together.
						 </p>
					 </div>
				 </section>

				 {/* Frame 2: Community Structure */}
				<section className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 border border-gray-300">
					<h2 className="text-3xl font-bold mb-8 text-center">Communities</h2>
					 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-blue-400">
							 <img src="/Coding-Club.png" alt="GDGOC Logo" className="w-10 h-10 mb-2" />
							<h3 className="text-xl font-bold mb-2">GDGOC</h3>
							 <p className="text-gray-700 text-center">Google Developer Groups on Campus: A global program by Google Developers that empowers students to explore technology, build skills, and collaborate on impactful projects. </p>
						 </div>
						<div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-blue-400">
							 <img src="/gsalogo.png" alt="GSA Logo" className="w-10 h-10 mb-2" />
							<h3 className="text-xl font-bold mb-2">GSA</h3>
							 <p className="text-gray-700 text-center">Google Student Ambassadors: Connecting students with Google resources and opportunities for growth.</p>
						 </div>
						<div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-blue-400">
							 <img src="https://www.svgrepo.com/show/303630/nvidia-logo.svg" alt="NVIDIA Logo" className="w-8 h-10 mb-3 " />
							<h3 className="text-xl font-bold mb-2">NVIDIA</h3>
							 <p className="text-gray-700 text-center">NVIDIA Community: Fostering AI, ML, and GPU computing skills through events and projects.</p>
						 </div>
						<div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-blue-400">
							 <img src="https://www.svgrepo.com/show/353810/google-developers.svg" alt="GDG Logo" className="w-10 h-10 mb-2" />
							<h3 className="text-xl font-bold mb-2">GDG</h3>
							 <p className="text-gray-700 text-center">Google Developer Group: Building a collaborative environment for developers to learn and innovate.</p>
						 </div>
					 </div>
				 </section>
			 </main>
		 </div>
	 );
	}
import GoogleParticlesCanvas from "@/components/googleParticleBackground";
