import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import ProjectsPage from '../ProjectsPage';
import ProjectDetailPage from '../ProjectDetailPage';
import { projects } from '../../data/projects';
import { getPersonByDeptAndSlug } from '../../data/teamData';

const CurrentPath = () => {
    const { pathname } = useLocation();
    return <output aria-label="Current profile URL">{pathname}</output>;
};

describe('Projects pages', () => {
    it('renders all sample projects as links with lazy-loaded, sized images', () => {
        render(
            <MemoryRouter>
                <ProjectsPage />
            </MemoryRouter>
        );

        for (const project of projects) {
            expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: new RegExp(project.title) })).toHaveAttribute('href', `/projects/${project.slug}`);
            expect(screen.getByAltText(project.imageAlt)).toHaveAttribute('loading', 'lazy');
            expect(screen.getByAltText(project.imageAlt)).toHaveAttribute('width', '960');
            expect(screen.getByAltText(project.imageAlt)).toHaveAttribute('height', '600');
        }

        expect(screen.queryByText(/Sample content:/)).not.toBeInTheDocument();
    });

    it('shows project details, deployment information, and contributions linked to existing profiles', () => {
        const project = projects[0];

        render(
            <MemoryRouter initialEntries={[`/projects/${project.slug}`]}>
                <Routes>
                    <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument();
        expect(screen.getByText(project.description)).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Deployment' })).toBeInTheDocument();
        expect(screen.getByText(project.deployment)).toBeInTheDocument();
        expect(screen.getAllByText(/Placeholder contribution:/)).toHaveLength(project.contributors.length);
        expect(screen.queryByText(/Sample content:/)).not.toBeInTheDocument();

        for (const contributor of project.contributors) {
            const person = getPersonByDeptAndSlug(contributor.departmentSlug, contributor.memberSlug);
            expect(person).toBeTruthy();
            expect(screen.getByRole('link', { name: person.name })).toHaveAttribute(
                'href',
                `/about/${person.deptSlug}/${person.slug}`
            );
            expect(screen.getByLabelText(`${person.name} portrait unavailable`)).toBeInTheDocument();
        }

        expect(screen.getByAltText(project.imageAlt)).toHaveAttribute('width', '960');
    });

    it('navigates every sample contributor to their existing member profile', async () => {
        const user = userEvent.setup();

        for (const project of projects) {
            for (const contributor of project.contributors) {
                const person = getPersonByDeptAndSlug(contributor.departmentSlug, contributor.memberSlug);
                expect(person).toBeTruthy();

                const profileUrl = `/about/${person.deptSlug}/${person.slug}`;
                const { unmount } = render(
                    <MemoryRouter initialEntries={[`/projects/${project.slug}`]}>
                        <Routes>
                            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                            <Route path="/about/:dept/:name" element={<CurrentPath />} />
                        </Routes>
                    </MemoryRouter>
                );

                const contributorLink = screen.getByRole('link', { name: person.name });
                expect(contributorLink).toHaveAttribute('href', profileUrl);
                await user.click(contributorLink);
                expect(screen.getByLabelText('Current profile URL')).toHaveTextContent(profileUrl);

                unmount();
            }
        }
    });

    it('shows a not-found state for an unknown project slug', () => {
        render(
            <MemoryRouter initialEntries={['/projects/not-a-project']}>
                <Routes>
                    <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: 'Project Not Found' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Back to Projects' })).toHaveAttribute('href', '/projects');
    });
});
