"use client";

import React from 'react';
import { X } from 'lucide-react';
import { SubClub } from '@/data/clubs';

interface ClubModalProps {
  club: SubClub | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ClubModal: React.FC<ClubModalProps> = ({ club, isOpen, onClose }) => {
  if (!isOpen || !club) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-white">
          <div className="flex items-center gap-3">
            <img src={club.logo} alt={club.name} className="h-10 w-10" />
            <h2 className="text-2xl font-bold text-gray-900">{club.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-gray-700">{club.description}</p>

          {/* Instructor */}
          {club.instructor && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 text-center">Instructor & Ambassador</h3>
              <div className="flex flex-col items-center gap-4 p-4 bg-gray-50 rounded-lg text-center">
                {club.instructor.photo && (
                  <img
                    src={club.instructor.photo}
                    alt={club.instructor.name}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900">{club.instructor.name}</p>
                  <p className="text-sm text-gray-600">{club.instructor.role}</p>
                </div>
              </div>
            </div>
          )}

          {/* Teaching Assistants */}
          {club.teachingAssistants && club.teachingAssistants.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 text-center">Teaching Assistants</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {club.teachingAssistants.map((ta, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg text-center flex flex-col items-center">
                    {ta.photo && (
                      <img
                        src={ta.photo}
                        alt={ta.name}
                        className="h-20 w-20 rounded-full object-cover mb-3"
                      />
                    )}
                    <p className="font-semibold text-gray-900">{ta.name}</p>
                    <p className="text-sm text-gray-600">{ta.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coordinators */}
          {club.coordinators && club.coordinators.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 text-center">Coordinators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {club.coordinators.map((coord, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg text-center flex flex-col items-center">
                    {coord.photo && (
                      <img
                        src={coord.photo}
                        alt={coord.name}
                        className="h-16 w-16 rounded-full object-cover mb-2"
                      />
                    )}
                    <p className="font-semibold text-gray-900">{coord.name}</p>
                    <p className="text-sm text-gray-600">{coord.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub Teams */}
          {club.subTeams && club.subTeams.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Teams</h3>
              {club.subTeams.map((team, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-semibold text-gray-700">{team.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {team.members.map((member, mIdx) => (
                      <div key={mIdx} className="p-4 bg-gray-50 rounded-lg text-center">
                        {member.photo && (
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="h-16 w-16 rounded-full object-cover mx-auto mb-2"
                          />
                        )}
                        <p className="font-semibold text-gray-900">{member.name}</p>
                        {member.role && (
                          <p className="text-xs text-gray-600">{member.role}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};