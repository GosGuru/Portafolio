
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Project } from '../types';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <motion.div
            layoutId={`project-card-${project.id}`}
            whileHover={{ y: -8 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden group"
        >
            <Link to={`/projects/${project.id}`}>
                <div className="overflow-hidden">
                    <motion.img
                        layoutId={`project-image-${project.id}`}
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-56 object-cover object-top transform group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-6">
                    <motion.h3 layoutId={`project-title-${project.id}`} className="text-xl font-bold text-gray-800 mb-1">{project.title}</motion.h3>
                    <motion.p layoutId={`project-category-${project.id}`} className="text-blue-500 font-medium mb-4">{project.category}</motion.p>
                    <div className="flex items-center text-orange-500 font-semibold">
                        Ver Proyecto
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProjectCard;
