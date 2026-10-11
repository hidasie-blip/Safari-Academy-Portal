import React, { useState } from 'react';
import { Announcement, SchoolEvent, UserRole } from '../../types';
import {
  Bell,
  Calendar,
  PlusCircle,
  Pin,
  MapPin,
  Users,
  CheckCircle,
  X,
} from 'lucide-react';

interface AnnouncementsManagerProps {
  announcements: Announcement[];
  events: SchoolEvent[];
  onAddAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  currentRole: UserRole;
  authorName: string;
}

export const AnnouncementsManager: React.FC<AnnouncementsManagerProps> = ({
  announcements,
  events,
  onAddAnnouncement,
  currentRole,
  authorName,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    amharicTitle: '',
    content: '',
    category: 'Academic' as 'Academic' | 'Administrative' | 'Events' | 'Exam Bulletin',
    targetRoles: ['admin', 'teacher', 'student', 'parent'] as UserRole[],
    isPinned: false,
  });

  const filteredAnnouncements = announcements.filter(
    (a) => activeCategory === 'all' || a.category === activeCategory
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    onAddAnnouncement({
      ...formData,
      publishedAt: new Date().toISOString(),
      authorName,
      authorRole: currentRole === 'admin' ? 'School Principal' : 'Faculty Member',
    });
    setIsModalOpen(false);
    setFormData({
      title: '',
      amharicTitle: '',
      content: '',
      category: 'Academic',
      targetRoles: ['admin', 'teacher', 'student', 'parent'],
      isPinned: false,
    });
  };

  const canCreate = currentRole === 'admin' || currentRole === 'teacher';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123D2B] tracking-tight">
            School Bulletins & Events Calendar
          </h1>
          <p className="text-xs sm:text-sm text-[#65736A]">
            Official notices, examination schedules, and parent assembly bulletins
          </p>
        </div>

        {canCreate && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#123D2B] text-white hover:bg-[#1D5A40] transition-colors shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Announcement</span>
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'Exam Bulletin', 'Academic', 'Events', 'Administrative'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeCategory === cat
                ? 'bg-[#123D2B] text-white'
                : 'bg-white border border-[#E1E8E1] text-[#65736A] hover:text-[#123D2B]'
            }`}
          >
            {cat === 'all' ? 'All Bulletins' : cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Announcements (2 Cols) and Events (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className={`p-5 rounded-2xl bg-white border transition-colors shadow-xs space-y-3 ${
                ann.isPinned ? 'border-[#2E8B57]/50 ring-1 ring-[#2E8B57]/20' : 'border-[#E1E8E1]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {ann.isPinned && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#2E8B57]">
                        <Pin className="w-3 h-3 fill-current" />
                        <span>Pinned Notice</span>
                      </span>
                    )}
                    <span className="text-[10px] font-semibold text-[#123D2B] bg-[#E8F5E9] px-2 py-0.5 rounded-md">
                      {ann.category}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#123D2B] leading-snug">
                    {ann.title}
                  </h3>
                  {ann.amharicTitle && (
                    <div className="font-ethiopic text-xs font-semibold text-[#1D5A40]">
                      {ann.amharicTitle}
                    </div>
                  )}
                </div>
                <span className="text-[11px] text-[#65736A] whitespace-nowrap shrink-0">
                  {new Date(ann.publishedAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-xs text-[#17251D] leading-relaxed">
                {ann.content}
              </p>

              <div className="pt-2 border-t border-[#E1E8E1] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#65736A]">
                <div className="flex items-center gap-2">
                  <span>Author: <strong className="text-[#17251D]">{ann.authorName}</strong> ({ann.authorRole})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#2E8B57]" />
                  <span>Target: {ann.targetRoles.join(', ')}</span>
                </div>
              </div>
            </div>
          ))}

          {filteredAnnouncements.length === 0 && (
            <div className="p-8 rounded-2xl bg-white border border-[#E1E8E1] text-center text-[#65736A] text-xs">
              No bulletins matching this category.
            </div>
          )}
        </div>

        {/* Academic Calendar Events Strip */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2E8B57]" />
                <h3 className="text-sm font-bold text-[#123D2B]">
                  Upcoming School Dates
                </h3>
              </div>
              <span className="text-[10px] text-[#65736A]">2018 ዓ.ም</span>
            </div>

            <div className="space-y-3">
              {events.map((evt) => (
                <div key={evt.id} className="p-3.5 rounded-xl border border-[#E1E8E1] bg-[#F7F9F6] space-y-1.5">
                  <span className="text-xs font-bold text-[#17251D] block">{evt.title}</span>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#2E8B57]">
                    <span>{evt.gregorianDate}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-ethiopic text-[#1D5A40]">{evt.ethiopicDate}</span>
                  </div>
                  <p className="text-[11px] text-[#65736A] leading-tight">{evt.description}</p>
                  <div className="flex items-center gap-1 text-[10px] text-[#65736A] pt-1">
                    <MapPin className="w-3 h-3 text-[#2E8B57]" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal to Create Announcement */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#E1E8E1] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#E1E8E1] bg-[#F7F9F6] flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#123D2B]">Compose School Announcement</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#65736A] hover:text-[#123D2B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#123D2B] mb-1">Bulletin Title (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grade 12 Mock Examination Notice"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:ring-2 focus:ring-[#2E8B57] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#123D2B] mb-1">Amharic Title (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. የ12ኛ ክፍል የሙከራ ፈተና ማስታወቂያ"
                  value={formData.amharicTitle}
                  onChange={(e) => setFormData({ ...formData, amharicTitle: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:ring-2 focus:ring-[#2E8B57] focus:outline-none font-ethiopic"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#123D2B] mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:ring-2 focus:ring-[#2E8B57] focus:outline-none"
                >
                  <option value="Academic">Academic</option>
                  <option value="Exam Bulletin">Exam Bulletin</option>
                  <option value="Events">Events</option>
                  <option value="Administrative">Administrative</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#123D2B] mb-1">Announcement Body *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write announcement content..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:ring-2 focus:ring-[#2E8B57] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pinCheck"
                  checked={formData.isPinned}
                  onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                  className="rounded border-[#E1E8E1] text-[#2E8B57] focus:ring-[#2E8B57]"
                />
                <label htmlFor="pinCheck" className="text-xs text-[#17251D] font-medium cursor-pointer">
                  Pin to top of bulletin board
                </label>
              </div>

              <div className="pt-3 border-t border-[#E1E8E1] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E1E8E1] text-[#65736A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#123D2B] text-white font-semibold hover:bg-[#1D5A40]"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
