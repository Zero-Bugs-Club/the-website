// Sample project details and contributor assignments are placeholders; replace
// them with verified information before presenting these projects as real work.
export const projects = [
    {
        slug: 'campus-connect',
        title: 'Campus Connect',
        category: 'Community platform',
        image: '/projects/campus-connect.svg',
        imageAlt: 'Abstract sample artwork for the Campus Connect project',
        description: 'Placeholder project description: a community platform concept for sharing campus updates, resources, and student activities.',
        deployment: 'Placeholder: add a verified website URL or physical deployment location.',
        contributors: [
            {
                departmentSlug: 'projects',
                memberSlug: 'joel-panjimaram-mathew',
                contribution: 'Placeholder contribution: describe this contributor’s verified work on the project.'
            },
            {
                departmentSlug: 'technical',
                memberSlug: 'priya-nair',
                contribution: 'Placeholder contribution: describe this contributor’s verified work on the project.'
            }
        ]
    },
    {
        slug: 'studyspace-finder',
        title: 'StudySpace Finder',
        category: 'Campus utility',
        image: '/projects/studyspace-finder.svg',
        imageAlt: 'Abstract sample artwork for the StudySpace Finder project',
        description: 'Placeholder project description: a campus utility concept for discovering and sharing suitable study spaces.',
        deployment: 'Placeholder: add a verified website URL or physical deployment location.',
        contributors: [
            {
                departmentSlug: 'technical',
                memberSlug: 'tharun-gopinath',
                contribution: 'Placeholder contribution: describe this contributor’s verified work on the project.'
            }
        ]
    },
    {
        slug: 'resource-hub',
        title: 'Resource Hub',
        category: 'Learning resources',
        image: '/projects/resource-hub.svg',
        imageAlt: 'Abstract sample artwork for the Resource Hub project',
        description: 'Placeholder project description: a resource hub concept for organizing learning materials and club documentation.',
        deployment: 'Placeholder: add a verified website URL or physical deployment location.',
        contributors: [
            {
                departmentSlug: 'design',
                memberSlug: 'aryan-pillai',
                contribution: 'Placeholder contribution: describe this contributor’s verified work on the project.'
            },
            {
                departmentSlug: 'technical',
                memberSlug: 'vikram-aditya',
                contribution: 'Placeholder contribution: describe this contributor’s verified work on the project.'
            }
        ]
    }
];

export const getProjectBySlug = (slug) => projects.find((project) => project.slug === slug);
