export const aboutDepartments = [
    {
        slug: 'event',
        name: 'Event',
        summary: 'Event-summary',
        lead: 'Event Lead',
        leadNote: 'The Event team keeps club activity structured, reliable, and welcoming. Member contributions here can include event planning, logistics, registrations, hosting, and post-event documentation.',
        members: [
            {
                slug: 'event-member-one',
                name: 'Event Member One',
                description: 'Supports event planning, venue coordination, and session-day execution.',
                github: '#',
                linkedin: '#',
                instagram: '#',
                contributions: [
                    'Coordinated logistics for ZBC club sessions.',
                    'Helped document event flow and participant communication.'
                ]
            },
            {
                slug: 'event-member-two',
                name: 'Event Member Two',
                description: 'Assists with registrations, volunteer coordination, and event checklists.',
                github: '#',
                linkedin: '#',
                instagram: '#',
                contributions: [
                    'Maintained event checklists and registration support.',
                    'Assisted with on-ground coordination during club programs.'
                ]
            }
        ]
    },
    {
        slug: 'hr',
        name: 'HR',
        summary: 'HR',
        lead: 'HR Lead',
        leadNote: 'The HR team helps members settle into the club and keeps internal collaboration healthy. This page can track onboarding work, communication ownership, and team support contributions.',
        members: [
            {
                slug: 'hr-member-one',
                name: 'HR Member One',
                description: 'Works on onboarding, member records, and internal coordination.',
                github: '#',
                linkedin: '#',
                instagram: '#',
                contributions: [
                    'Supported onboarding for new ZBC members.',
                    'Maintained internal member coordination records.'
                ]
            },
            {
                slug: 'hr-member-two',
                name: 'HR Member Two',
                description: 'Helps keep department communication organized and accessible.',
                github: '#',
                linkedin: '#',
                instagram: '#',
                contributions: [
                    'Assisted with internal announcements and member follow-ups.',
                    'Helped organize club communication workflows.'
                ]
            }
        ]
    },
    {
        slug: 'design',
        name: 'Design',
        summary: 'Creates visual systems, social creatives, event assets, and club-facing design material.',
        lead: 'Design Lead',
        leadNote: 'The Design team defines how ZBC looks across events, announcements, and digital surfaces. Contributions here can include posters, visual guidelines, slide designs, and campaign assets.',
        members: [
            {
                slug: 'design-member-one',
                name: 'Design Member One',
                description: 'Creates event posters, social media creatives, and brand-aligned visuals.',
                github: '#',
                linkedin: '#',
                instagram: '#',
                contributions: [
                    'Designed visual assets for club announcements.',
                    'Contributed to event poster and campaign design.'
                ]
            },
            {
                slug: 'design-member-two',
                name: 'Design Member Two',
                description: 'Works on layouts, design polish, and presentation-ready creative assets.',
                github: '#',
                linkedin: '#',
                instagram: '#',
                contributions: [
                    'Prepared presentation and workshop design material.',
                    'Helped maintain visual consistency across club creatives.'
                ]
            }
        ]
    },
    {
        slug: 'projects',
        name: 'Projects',
        summary: 'Builds, maintains, and documents software projects owned or supported by ZBC.',
        lead: 'Projects Lead',
        leadNote: 'The Projects team turns ideas into usable systems. This page can record development work, shipped features, fixes, documentation, and maintenance contributions.',
        members: [
            {
                slug: 'projects-member-one',
                name: 'Projects Member One',
                description: 'Contributes to ZBC software builds, implementation work, and documentation.',
                github: '#',
                linkedin: '#',
                instagram: '#',
                contributions: [
                    'Implemented features for club project work.',
                    'Documented project setup and development notes.'
                ]
            },
            {
                slug: 'projects-member-two',
                name: 'Projects Member Two',
                description: 'Works on interfaces, reusable components, and responsive frontend behavior.',
                github: '#',
                linkedin: '#',
                instagram: '#',
                contributions: [
                    'Built frontend components for club initiatives.',
                    'Reviewed responsive behavior and UI consistency.'
                ]
            }
        ]
    },
    {
        slug: 'outreach',
        name: 'Outreach',
        summary: 'Handles external communication, collaborations, partnerships, and visibility for ZBC.',
        lead: 'Outreach Lead',
        leadNote: 'The Outreach team connects ZBC with people, opportunities, and communities outside the club. Member records here can document collaboration work, speaker coordination, and public-facing communication.',
        members: [
            {
                slug: 'outreach-member-one',
                name: 'Outreach Member One',
                description: 'Supports collaborations, external communication, and speaker coordination.',
                github: '#',
                linkedin: '#',
                instagram: '#',
                contributions: [
                    'Helped coordinate external communication for ZBC programs.',
                    'Supported collaboration planning and follow-ups.'
                ]
            },
            {
                slug: 'outreach-member-two',
                name: 'Outreach Member Two',
                description: 'Works on club visibility, communication pipelines, and outreach documentation.',
                github: '#',
                linkedin: '#',
                instagram: '#',
                contributions: [
                    'Maintained outreach notes and contact follow-ups.',
                    'Assisted with public-facing communication for club activities.'
                ]
            }
        ]
    },
    {
        slug: 'technical',
        name: 'Technical',
        summary: 'Owns technical sessions, reviews, engineering quality, and technical mentorship.',
        lead: 'Technical Lead',
        leadNote: 'The Technical team supports ZBC learning and engineering standards. This page can capture workshops delivered, mentoring work, reviews, fixes, and technical leadership.',
        members: [
            {
                slug: 'technical-member-one',
                name: 'Technical Member One',
                description: 'Helps with workshops, code reviews, and technical guidance for members.',
                github: '#',
                linkedin: '#',
                instagram: '#',
                contributions: [
                    'Supported technical mentoring during club sessions.',
                    'Reviewed implementation work and shared engineering feedback.'
                ]
            },
            {
                slug: 'technical-member-two',
                name: 'Technical Member Two',
                description: 'Contributes to technical content, demos, and learning material.',
                github: '#',
                linkedin: '#',
                instagram: '#',
                contributions: [
                    'Prepared technical examples for club learning sessions.',
                    'Helped document workshop notes and references.'
                ]
            }
        ]
    }
];

export const getDepartmentBySlug = slug =>
    aboutDepartments.find(department => department.slug === slug);

export const getMemberBySlug = (departmentSlug, memberSlug) => {
    const department = getDepartmentBySlug(departmentSlug);

    if (!department) return { department: undefined, member: undefined };

    // member as provided
    let member = department.members.find(item => item.slug === memberSlug);

    // if not found, check if requested slug matches synthesized lead slug (e.g., '{dept}-lead')
    const leadSlug = `${department.slug}-lead`;
    if (!member && memberSlug === leadSlug) {
        member = {
            slug: leadSlug,
            name: department.lead || `${department.name} Lead`,
            role: 'Department Lead',
            description: department.leadNote || department.summary,
            github: '#',
            linkedin: '#',
            instagram: '#',
            contributions: []
        };
    }

    return { department, member };
};

// Board members (president, vice president, general secretary, co-secretary)
export const boardMembers = [
    {
        slug: 'president',
        name: 'Chairperson Name',
        role: 'President',
        description: 'Leads the club and oversees strategic direction.',
        note: 'Board note about club direction and leadership.',
        github: '#',
        linkedin: '#',
        instagram: '#',
        contributions: [
            'Provides leadership and strategic guidance for ZBC.'
        ]
    },
    {
        slug: 'vice-president',
        name: 'Kishal P',
        role: 'Vice President',
        description: 'Supports the president and leads initiatives.',
        note: 'Board note from the Vice President.',
        github: '#',
        linkedin: '#',
        instagram: '#',
        contributions: [
            'Supports club initiatives and operational planning.'
        ]
    },
    {
        slug: 'general-secretary',
        name: 'Mano Karthik',
        role: 'General Secretary',
        description: 'Manages club communications and documentation.',
        note: 'Board note from the General Secretary.',
        github: '#',
        linkedin: '#',
        instagram: '#',
        contributions: [
            'Oversees internal documentation and member coordination.'
        ]
    },
    {
        slug: 'co-secretary',
        name: 'Divya R',
        role: 'Co-Secretary',
        description: 'Assists the general secretary and supports operations.',
        note: 'Board note from the Co-Secretary.',
        github: '#',
        linkedin: '#',
        instagram: '#',
        contributions: [
            'Assists with secretariat duties and member coordination.'
        ]
    }
];

export const getBoardMemberBySlug = slug => boardMembers.find(m => m.slug === slug);

