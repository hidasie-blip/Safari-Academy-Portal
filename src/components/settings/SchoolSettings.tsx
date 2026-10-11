import React, { useState } from 'react';
import { SchoolSettingsConfig } from '../../types';
import { SafariLogo, SafariBanner } from '../common/BrandAssets';
import { Settings, Save, Check, RefreshCw, Upload, Image as ImageIcon, ShieldCheck } from 'lucide-react';

interface SchoolSettingsProps {
  settings: SchoolSettingsConfig;
  onUpdateSettings: (newSettings: SchoolSettingsConfig) => void;
}

export const SchoolSettings: React.FC<SchoolSettingsProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const [formData, setFormData] = useState<SchoolSettingsConfig>({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData((prev) => ({ ...prev, customLogoUrl: result, useOfficialSvgBranding: false }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData((prev) => ({ ...prev, customBannerUrl: result, useOfficialSvgBranding: false }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetToOfficialBranding = () => {
    setFormData((prev) => ({
      ...prev,
      customLogoUrl: '',
      customBannerUrl: '',
      useOfficialSvgBranding: true,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123D2B] tracking-tight">
            School Configuration & Brand Assets
          </h1>
          <p className="text-xs sm:text-sm text-[#65736A]">
            Manage Safari Academy academic calendars, campuses, and official identity assets
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-[#123D2B] text-white hover:bg-[#1D5A40] transition-colors shadow-xs"
        >
          {saveSuccess ? <Check className="w-4 h-4 text-[#A7F3D0]" /> : <Save className="w-4 h-4" />}
          <span>{saveSuccess ? 'Changes Saved!' : 'Save Configuration'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand Identity & Asset Customization */}
        <div className="p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E1E8E1]">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#2E8B57]" />
              <h2 className="text-sm font-bold text-[#123D2B]">
                Official Safari Academy Branding Assets
              </h2>
            </div>
            <button
              type="button"
              onClick={resetToOfficialBranding}
              className="text-xs font-semibold text-[#2E8B57] hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Official Vector Assets</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Preview & Uploader */}
            <div className="p-4 rounded-xl border border-[#E1E8E1] bg-[#F7F9F6] space-y-3">
              <span className="text-xs font-bold text-[#123D2B] block">
                School Emblem & Logo
              </span>
              <div className="flex items-center gap-4">
                <SafariLogo size="xl" showText customUrl={formData.customLogoUrl} />
              </div>
              <div className="pt-2">
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E1E8E1] bg-white text-xs font-semibold text-[#123D2B] cursor-pointer hover:bg-slate-50 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-[#2E8B57]" />
                  <span>Upload Custom Logo File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-[10px] text-[#65736A] mt-1">
                  Replaces `/public/branding/safari-logo.svg` in runtime state.
                </p>
              </div>
            </div>

            {/* Banner Preview & Uploader */}
            <div className="p-4 rounded-xl border border-[#E1E8E1] bg-[#F7F9F6] space-y-3">
              <span className="text-xs font-bold text-[#123D2B] block">
                Official School Banner Preview
              </span>
              <div className="w-full">
                <SafariBanner customUrl={formData.customBannerUrl} />
              </div>
              <div className="pt-2">
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E1E8E1] bg-white text-xs font-semibold text-[#123D2B] cursor-pointer hover:bg-slate-50 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-[#2E8B57]" />
                  <span>Upload Custom Banner File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-[10px] text-[#65736A] mt-1">
                  Preserves aspect ratio and crisp alignment across all devices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Institution Information */}
        <div className="p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#123D2B] pb-3 border-b border-[#E1E8E1]">
            Institution Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#123D2B] mb-1">School Name (English)</label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:ring-2 focus:ring-[#2E8B57] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#123D2B] mb-1">School Name (Amharic)</label>
              <input
                type="text"
                value={formData.amharicSchoolName}
                onChange={(e) => setFormData({ ...formData, amharicSchoolName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:ring-2 focus:ring-[#2E8B57] focus:outline-none font-ethiopic"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#123D2B] mb-1">Official Motto (English)</label>
              <input
                type="text"
                value={formData.mottoEnglish}
                onChange={(e) => setFormData({ ...formData, mottoEnglish: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:ring-2 focus:ring-[#2E8B57] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#123D2B] mb-1">Official Motto (Amharic)</label>
              <input
                type="text"
                value={formData.mottoAmharic}
                onChange={(e) => setFormData({ ...formData, mottoAmharic: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:ring-2 focus:ring-[#2E8B57] focus:outline-none font-ethiopic"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#123D2B] mb-1">Current Academic Year</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formData.currentAcademicYear}
                  onChange={(e) => setFormData({ ...formData, currentAcademicYear: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:ring-2 focus:ring-[#2E8B57] focus:outline-none"
                />
                <input
                  type="text"
                  value={formData.ethiopicYear}
                  onChange={(e) => setFormData({ ...formData, ethiopicYear: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:ring-2 focus:ring-[#2E8B57] focus:outline-none font-ethiopic"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#123D2B] mb-1">Main Secondary Campus</label>
              <input
                type="text"
                value={formData.mainCampus}
                onChange={(e) => setFormData({ ...formData, mainCampus: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:ring-2 focus:ring-[#2E8B57] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-[#123D2B] mb-1">Campus Physical Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:ring-2 focus:ring-[#2E8B57] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
