import Image from "next/image";

export default function AboutPage() {
const aboutData = {
	hero: {
		title: "Coding Club",
		logo: "/Coding-Club.png",
		description: "GDG Coding Club is dedicated to building a vibrant community for tech enthusiasts. We organize workshops, hackathons, and events to empower students and professionals to learn, collaborate, and innovate together."
	},
	vision: {
		title: "Vision",
		content: "A thriving ecosystem of coders, united by Synergy, Trust, and Passion. Where ideas turn into innovation, collaboration fuels creativity, and technology serves humanity. Our vision is to inspire learners, empower leaders, and shape a digital future with pride for our nation."
	},
	mission: {
		title: "Mission",
		content: "To emerge as a Centre of Excellence in coding and technology, guided by Synergy, Trust, and Passion. We envision nurturing problem-solvers and innovators, empowering students with future-ready skills, fostering collaboration and creativity, building a community that inspires and uplifts, driving impactful projects for society, and contributing to national growth in the global arena."
	},
	communities: [
		{
			name: "Cisco",
			logo: "/logo/logo-cisco.jpg",
			description: "Cisco Networking Academy: Equipping students with networking and cybersecurity skills for the digital age."
		},
		{
			name: "GSA",
			logo: "/gsalogo.png",
			description: "Google Student Ambassadors: Connecting students with Google resources and opportunities for growth."
		},
		{
			name: "NVIDIA",
			logo: "/logo/logo-nvidia.jpg",
			description: "NVIDIA Community: Fostering AI, ML, and GPU computing skills through events and projects."
		},
		{
			name: "GDG",
			logo: "https://www.svgrepo.com/show/353810/google-developers.svg",
			description: "Google Developer Group: Building a collaborative environment for developers to learn and innovate."
		}
	]
};

return (
	<div className="relative min-h-screen text-foreground overflow-x-hidden">
		<main className="py-12 px-4 flex flex-col items-center">
			{/* Frame 1: Coding Club heading, Vision and Mission as 2 grid boxes, description below */}
			<section className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 mb-12 flex flex-col items-center border border-gray-300">
				<h1 className="text-5xl font-bold mb-8 text-center flex items-center justify-center gap-4">
					<Image
						src={aboutData.hero.logo}
						alt={`${aboutData.hero.title} Logo`}
						className="w-16 inline-block"
						width={50}
						height={50}
					/>
					{aboutData.hero.title}
				</h1>
				<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
					<div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-blue-400">
						<h1 className="text-3xl font-bold mb-4">{aboutData.vision.title}</h1>
						<p className="text-lg text-gray-700 text-center">
							"{aboutData.vision.content}"
						</p>
					</div>
					<div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-blue-400">
						<h2 className="text-3xl font-bold mb-4">{aboutData.mission.title}</h2>
						<p className="text-md text-gray-800 text-center">
							"{aboutData.mission.content}"
						</p>
					</div>
				</div>
				<div className="w-full mt-2 text-center">
					<p className="text-base text-gray-600">
						{aboutData.hero.description}
					</p>
				</div>
			</section>

			{/* Frame 2: Community Structure */}
			<section className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 border border-gray-300">
				<h2 className="text-3xl font-bold mb-8 text-center">Communities</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{aboutData.communities.map((community) => (
						<div 
							key={community.name} 
							className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-blue-400"
						>
							<Image
								src={community.logo}
								alt={`${community.name} Logo`}
								className="w-12 mb-2"
								width={48}
								height={48}
							/>
							<h3 className="text-xl font-bold mb-2">{community.name}</h3>
							<p className="text-gray-700 text-center">
								{community.description}
							</p>
						</div>
					))}
				</div>
			</section>
		</main>
	</div>
);
}
