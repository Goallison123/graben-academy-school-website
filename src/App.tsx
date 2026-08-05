/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ChildGreetingModal } from './components/ChildGreetingModal';
import { CanvasGame } from './components/CanvasGame';
import { WorldWeaverGame } from './components/WorldWeaverGame';
import { SoundSnatcherGame } from './components/SoundSnatcherGame';
import { MirrorWorldGame } from './components/MirrorWorldGame';
import { GamePackageSelector } from './components/GamePackageSelector';
import { BigRevealOverlay } from './components/BigRevealOverlay';
import { DigitalFridge } from './components/DigitalFridge';
import { LivingSanctuary } from './components/LivingSanctuary';
import { TeacherDashboard } from './components/TeacherDashboard';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { GrabenSchoolWebsite, SubPageType } from './components/GrabenSchoolWebsite';

import {
  getStoredChildName,
  setStoredChildName,
  getStoredPlayCount,
  incrementPlayCount,
  getStoredArtworks,
  saveArtwork,
  toggleParentLike,
  getStoredCharms,
  unlockCharm,
  getStoredSchoolConfig,
  saveSchoolConfig,
  getStoredTeacherPings,
  sendTeacherPing,
  updateTeacherPingStatus,
  isFirstVisit,
} from './utils/storage';

import { getAwardCharm } from './data/charmsData';
import { soundEngine } from './utils/sound';
import { ArtworkEntry, GamePackageId, LivingCharm, SchoolConfig, TeacherPing } from './types';

export default function App() {
  // Application Data State
  const [childName, setChildName] = useState<string>(() => getStoredChildName());
  const [playCount, setPlayCount] = useState<number>(() => getStoredPlayCount());
  const [artworks, setArtworks] = useState<ArtworkEntry[]>(() => getStoredArtworks());
  const [unlockedCharms, setUnlockedCharms] = useState<LivingCharm[]>(() => getStoredCharms());
  const [schoolConfig, setSchoolConfig] = useState<SchoolConfig>(() => getStoredSchoolConfig());
  const [teacherPings, setTeacherPings] = useState<TeacherPing[]>(() => getStoredTeacherPings());

  // UI State
  const [activeTab, setActiveTab] = useState<'website' | 'canvas' | 'sanctuary' | 'fridge' | 'teacher'>('website');
  const [websiteSubPage, setWebsiteSubPage] = useState<SubPageType>('home');
  const [selectedGame, setSelectedGame] = useState<GamePackageId>('seeds');
  const [isGreetingOpen, setIsGreetingOpen] = useState<boolean>(() => isFirstVisit());
  const [isPWAInfoOpen, setIsPWAInfoOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => soundEngine.getMuted());

  // Win Ceremony Overlay State
  const [activeWinSession, setActiveWinSession] = useState<{
    artworkDataUrl: string;
    seedsConnected: number;
    creatureName: string;
    seedHex: string;
    melodyNotes: number[];
    charmEarned: LivingCharm;
    currentArtworkEntry: ArtworkEntry;
  } | null>(null);

  // Sync Audio Mute
  const handleToggleMute = () => {
    const muted = soundEngine.toggleMuted();
    setIsMuted(muted);
  };

  // Save Child Name
  const handleSaveChildName = (newName: string) => {
    setStoredChildName(newName);
    setChildName(newName);
  };

  // Save School Customization
  const handleSaveSchoolConfig = (newConfig: SchoolConfig) => {
    saveSchoolConfig(newConfig);
    setSchoolConfig(newConfig);
  };

  // Handle Win Event from Canvas
  const handleWinGame = (winData: {
    dataUrl: string;
    seedsConnected: number;
    creatureName: string;
    seedHex: string;
    melodyNotes: number[];
  }) => {
    const newPlayCount = incrementPlayCount();
    setPlayCount(newPlayCount);

    const awardCharm = getAwardCharm(newPlayCount, childName);
    const updatedCharms = unlockCharm(awardCharm);
    setUnlockedCharms(updatedCharms);

    const newArtwork: ArtworkEntry = {
      id: `art-${Date.now()}`,
      childName,
      title: `${winData.creatureName} Creation`,
      dataUrl: winData.dataUrl,
      timestamp: new Date().toISOString(),
      seedsConnected: winData.seedsConnected,
      creatureName: winData.creatureName,
      charmEarned: awardCharm,
      seedHex: winData.seedHex,
      melodyNotes: winData.melodyNotes,
    };

    setActiveWinSession({
      artworkDataUrl: winData.dataUrl,
      seedsConnected: winData.seedsConnected,
      creatureName: winData.creatureName,
      seedHex: winData.seedHex,
      melodyNotes: winData.melodyNotes,
      charmEarned: awardCharm,
      currentArtworkEntry: newArtwork,
    });
  };

  // Action: Save to Digital Fridge
  const handleSaveToFridge = () => {
    if (!activeWinSession) return;
    const updated = saveArtwork(activeWinSession.currentArtworkEntry);
    setArtworks(updated);
  };

  // Action: Send to Teacher
  const handleSendToTeacher = () => {
    if (!activeWinSession) return;
    const ping: TeacherPing = {
      id: activeWinSession.currentArtworkEntry.id,
      childName,
      artworkTitle: activeWinSession.currentArtworkEntry.title,
      dataUrl: activeWinSession.artworkDataUrl,
      timestamp: activeWinSession.currentArtworkEntry.timestamp,
      creatureName: activeWinSession.creatureName,
      status: 'pending',
    };
    const updatedPings = sendTeacherPing(ping);
    setTeacherPings(updatedPings);

    // Also auto-save to fridge
    handleSaveToFridge();
  };

  // Action: Teacher Send Praise
  const handleTeacherSendPraise = (pingId: string, praiseComment: string) => {
    const updatedPings = updateTeacherPingStatus(pingId, praiseComment);
    setTeacherPings(updatedPings);
    setArtworks(getStoredArtworks()); // reload fridge artworks
  };

  // Action: Toggle Parent Like
  const handleToggleLike = (artId: string) => {
    const updated = toggleParentLike(artId);
    setArtworks(updated);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] text-orange-950 font-sans antialiased flex flex-col selection:bg-orange-400 selection:text-white">
      
      {/* App Header & Navigation */}
      <Navbar
        schoolConfig={schoolConfig}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        websiteSubPage={websiteSubPage}
        setWebsiteSubPage={setWebsiteSubPage}
        childName={childName}
        onChangeNameClick={() => setIsGreetingOpen(true)}
        unseenFridgeCount={artworks.filter((a) => !a.parentLiked).length}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenPWAInfo={() => setIsPWAInfoOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        {activeTab === 'website' && (
          <GrabenSchoolWebsite
            schoolConfig={schoolConfig}
            currentSubPage={websiteSubPage}
            onNavigateSubPage={setWebsiteSubPage}
            onOpenCanvas={() => setActiveTab('canvas')}
            onOpenSanctuary={() => setActiveTab('sanctuary')}
            onOpenFridge={() => setActiveTab('fridge')}
            onOpenTeacher={() => setActiveTab('teacher')}
          />
        )}

        {activeTab === 'canvas' && (
          <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            <GamePackageSelector
              selectedGame={selectedGame}
              onSelectGame={(gameId) => setSelectedGame(gameId)}
              childName={childName}
            />

            {selectedGame === 'seeds' && (
              <CanvasGame childName={childName} onWinGame={handleWinGame} />
            )}

            {selectedGame === 'weaver' && (
              <WorldWeaverGame
                childName={childName}
                schoolConfig={schoolConfig}
                onWinGame={handleWinGame}
              />
            )}

            {selectedGame === 'sound' && (
              <SoundSnatcherGame
                childName={childName}
                schoolConfig={schoolConfig}
                onWinGame={handleWinGame}
              />
            )}

            {selectedGame === 'mirror' && (
              <MirrorWorldGame
                childName={childName}
                schoolConfig={schoolConfig}
                onWinGame={handleWinGame}
              />
            )}
          </div>
        )}

        {activeTab === 'sanctuary' && (
          <LivingSanctuary
            unlockedCharms={unlockedCharms}
            childName={childName}
            playCount={playCount}
            onPlayCanvasClick={() => setActiveTab('canvas')}
          />
        )}

        {activeTab === 'fridge' && (
          <DigitalFridge
            artworks={artworks}
            childName={childName}
            schoolConfig={schoolConfig}
            onToggleLike={handleToggleLike}
          />
        )}

        {activeTab === 'teacher' && (
          <TeacherDashboard
            teacherPings={teacherPings}
            schoolConfig={schoolConfig}
            onSendPraise={handleTeacherSendPraise}
          />
        )}
      </main>

      {/* Modals & Overlays */}
      <ChildGreetingModal
        isOpen={isGreetingOpen}
        onClose={() => setIsGreetingOpen(false)}
        schoolConfig={schoolConfig}
        currentName={childName}
        onSaveName={handleSaveChildName}
      />

      {activeWinSession && (
        <BigRevealOverlay
          isOpen={Boolean(activeWinSession)}
          artworkDataUrl={activeWinSession.artworkDataUrl}
          childName={childName}
          creatureName={activeWinSession.creatureName}
          charmEarned={activeWinSession.charmEarned}
          schoolConfig={schoolConfig}
          onSendToTeacher={handleSendToTeacher}
          onSaveToFridge={handleSaveToFridge}
          onPlayAgain={() => setActiveWinSession(null)}
        />
      )}

    </div>
  );
}
