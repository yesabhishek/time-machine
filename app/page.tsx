"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShareDialog } from "@/components/share-dialog";
import { ChevronLeft, ChevronRight, Sparkles, Zap, Crown, Star, Trophy } from "lucide-react";

const calculateLevel = (age: number) => {
  return Math.floor(age / 5) + 1;
};

const calculateXP = (age: number) => {
  return (age % 5) * 20;
};

const getLifeLessons = (age: number) => {
  const level = calculateLevel(age);
  if (age > 100) {
    return {
      title: "🏆 LEGENDARY IMMORTAL ACHIEVED!",
      subtitle: `Level ${level} Time Warrior`,
      lessons: [
        { title: "Time Lord", description: "You've broken the space-time continuum", xp: 1000 },
        { title: "Century Club", description: "Survived 100+ years of updates", xp: 800 },
        { title: "History Maker", description: "You're in the game's changelog", xp: 900 },
        { title: "Living Legend", description: "New players study your strategies", xp: 1200 }
      ]
    };
  } else if (age < 13) {
    return {
      title: "🌟 ROOKIE EXPLORER DETECTED!",
      subtitle: `Level ${level} Adventure Seeker`,
      lessons: [
        { title: "Tutorial Master", description: "Learning life's basic controls", xp: 100 },
        { title: "Friendship Quest", description: "Building your first party", xp: 150 },
        { title: "Knowledge Hunter", description: "Collecting wisdom points", xp: 200 },
        { title: "Dream Chaser", description: "Unlocking imagination skills", xp: 250 }
      ]
    };
  } else if (age < 20) {
    return {
      title: "⚡ TEEN TITAN UNLOCKED!",
      subtitle: `Level ${level} Power Wielder`,
      lessons: [
        { title: "Identity Forge", description: "Crafting your character build", xp: 300 },
        { title: "Skill Tree Pioneer", description: "Discovering hidden talents", xp: 350 },
        { title: "Quest Seeker", description: "Taking on epic challenges", xp: 400 },
        { title: "Future Crafter", description: "Planning your skill path", xp: 450 }
      ]
    };
  } else if (age < 30) {
    return {
      title: "💫 PRIME CHAMPION ACTIVATED!",
      subtitle: `Level ${level} Life Warrior`,
      lessons: [
        { title: "Career Conquest", description: "Mastering professional dungeons", xp: 500 },
        { title: "Relationship Pro", description: "Maxing social skill tree", xp: 550 },
        { title: "Goal Crusher", description: "Achievement hunting master", xp: 600 },
        { title: "Time Bender", description: "Managing temporal resources", xp: 650 }
      ]
    };
  } else {
    return {
      title: "👑 WISDOM KEEPER SUPREME!",
      subtitle: `Level ${level} Master Guide`,
      lessons: [
        { title: "Legacy Builder", description: "Creating lasting impact quests", xp: 700 },
        { title: "Knowledge Sage", description: "Teaching next-gen players", xp: 750 },
        { title: "Life Artist", description: "Mastered all skill trees", xp: 800 },
        { title: "Time Sculptor", description: "Shaping future storylines", xp: 850 }
      ]
    };
  }
};

const XPBar = ({ xp }) => (
  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${xp}%` }}
      transition={{ duration: 1 }}
    />
  </div>
);

const AchievementBadge = ({ icon: Icon, achieved }) => (
  <div className={`p-2 rounded-full ${achieved ? 'bg-white/20' : 'bg-white/5'} backdrop-blur-xl`}>
    <Icon className={`w-6 h-6 ${achieved ? 'text-white' : 'text-white/20'}`} />
  </div>
);

const LifeLessonsCards = ({ lessons, age }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    const xp = lessons.lessons.reduce((acc, lesson) => acc + lesson.xp, 0);
    setTotalXP(xp);
  }, [lessons]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          {lessons.title}
        </h2>
        <p className="text-gray-400 font-mono">{lessons.subtitle}</p>

        <div className="flex justify-center space-x-4">
          <AchievementBadge icon={Trophy} achieved={age > 20} />
          <AchievementBadge icon={Star} achieved={age > 30} />
          <AchievementBadge icon={Crown} achieved={age > 50} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-white/60">
            <span>XP: {totalXP}</span>
            <span>NEXT LEVEL: {calculateXP(age)}%</span>
          </div>
          <XPBar xp={calculateXP(age)} />
        </div>
      </div>

      <div className="relative h-72">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 180 }}
            className="absolute inset-0"
          >
            <div className="bg-black/40 backdrop-blur-xl h-full rounded-3xl p-8 border border-white/10 
                          shadow-[0_0_15px_rgba(255,255,255,0.1)] flex flex-col justify-center 
                          items-center text-center space-y-4 relative overflow-hidden group 
                          hover:border-white/20 transition-all">
              <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 
                            group-hover:opacity-100 transition-opacity" />
              <Sparkles className="w-8 h-8 text-white/20 absolute top-4 right-4 animate-pulse" />
              <h3 className="text-2xl font-black text-white">
                {lessons.lessons[currentIndex].title}
              </h3>
              <p className="text-gray-400 font-mono">
                {lessons.lessons[currentIndex].description}
              </p>
              <div className="font-mono space-y-2">
                <div className="text-white/40 text-sm">
                  ACHIEVEMENT {currentIndex + 1} / {lessons.lessons.length}
                </div>
                <div className="text-white/60">
                  +{lessons.lessons[currentIndex].xp} XP
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 backdrop-blur-xl
                     hover:bg-white/10 transition-all border border-white/10"
          onClick={() => setCurrentIndex((prev) => (prev - 1 + lessons.lessons.length) % lessons.lessons.length)}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 backdrop-blur-xl
                     hover:bg-white/10 transition-all border border-white/10"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % lessons.lessons.length)}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </motion.div>
  );
};

const AgeDisplay = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const updateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setDisplayValue(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  }, [value]);

  return (
    <div className="relative inline-block">
      <span className="relative z-10 text-white mix-blend-difference">{displayValue}</span>
      <Zap className="absolute -top-6 -right-6 w-12 h-12 text-white/20 animate-pulse" />
    </div>
  );
};

export default function AgeCalculator() {
  const [date, setDate] = useState({ month: "", day: "", year: "" });
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [lifeLessons, setLifeLessons] = useState(null);

  const handleCalculate = () => {
    setError("");
    const { month, day, year } = date;

    if (!month || !day || !year) {
      setError("CRITICAL ERROR: TIME COORDINATES REQUIRED!");
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      const birthDate = new Date(`${month}/${day}/${year}`);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();

      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }

      setAge(calculatedAge);
      setLifeLessons(getLifeLessons(calculatedAge));
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <main className="container max-w-lg mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <header className="space-y-4 text-center">
            <h1 className="text-6xl majorMono font-black text-white tracking-tight">
              Time <br /> Machine
            </h1>
            <p className="text-gray-400 font-mono">INITIALIZE YOUR TIME COORDINATES</p>
          </header>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "MONTH", key: "month", placeholder: "MM", maxLength: 2 },
              { label: "DAY", key: "day", placeholder: "DD", maxLength: 2 },
              { label: "YEAR", key: "year", placeholder: "YYYY", maxLength: 4 }
            ].map((field) => (
              <div key={field.key} className="space-y-2">
                <Input
                  type="text"
                  placeholder={field.placeholder}
                  value={date[field.key]}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, field.maxLength);
                    setDate(prev => ({ ...prev, [field.key]: val }));
                  }}
                  className="h-16 text-center text-xl font-mono bg-black/50 border-white/10 
                           focus:border-white/30 focus:ring-2 focus:ring-white/10 rounded-xl
                           text-white placeholder:text-white/20"
                />
                <p className="text-xs text-center text-gray-500 font-mono tracking-widest">
                  {field.label}
                </p>
              </div>
            ))}
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-red-500 font-mono"
            >
              {error}
            </motion.p>
          )}

          <Button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="w-full h-16 text-xl font-black tracking-wide bg-white/10 hover:bg-white/20
                     border border-white/10 hover:border-white/30 rounded-xl transition-all
                     text-white backdrop-blur-xl relative overflow-hidden group"
          >
            <span className="relative z-10">
              {isCalculating ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2"
                >
                  <span>CALCULATING</span>
                  <span className="opacity-50 animate-pulse">...</span>
                </motion.div>
              ) : (
                "BEGIN TIME SCAN"
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform 
                          duration-1000" />
          </Button>

          <AnimatePresence mode="wait">
            {age !== null && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12 py-8"
              >
                <div className="text-center space-y-8">
                  <motion.div
                    className="relative"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <div className="text-9xl md:text-[12rem] font-black tracking-tighter">
                      <AgeDisplay value={age} />
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-xl 
                               rounded-lg px-3 py-1 font-mono text-sm text-white/80"
                    >
                      Level {calculateLevel(age)}
                    </motion.div>
                  </motion.div>

                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <p className="text-xl text-gray-400 font-mono">
                        TIME UNITS ANALYZED
                      </p>
                      <div className="flex gap-2">
                        {Array.from({ length: Math.min(5, Math.floor(age / 10)) }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-white/80 animate-pulse"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <ShareDialog
                        age={age}
                        message={`🎮 Level ${calculateLevel(age)} Time Warrior! Just scored ${age} years of XP!`}
                      />
                    </motion.div>
                  </div>
                </div>

                {lifeLessons && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <LifeLessonsCards lessons={lifeLessons} age={age} />
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-center font-mono text-white/40 text-sm"
                >
                  Press CALCULATE again to start a new quest
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}