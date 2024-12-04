import React, { useState, useEffect } from 'react';
import { Heart, Award, Star, Activity, Smile, Zap, Upload, CheckCircle } from 'lucide-react';

const wellnessTasks = [
  {
    id: 1,
    title: "Morning Stretch Challenge",
    description: "Do 5 minutes of gentle stretching after waking up",
    points: 10,
    category: "Physical",
    proofType: "image"
  },
  {
    id: 2,
    title: "Hydration Check",
    description: "Drink 2 glasses of water before noon",
    points: 5,
    category: "Physical",
    proofType: "text"
  },
  {
    id: 3,
    title: "Mindful Moment",
    description: "Practice 3 minutes of deep breathing",
    points: 15,
    category: "Mental",
    proofType: "text"
  },
  {
    id: 4,
    title: "Gratitude Journal",
    description: "Write down 3 things you're grateful for",
    points: 10,
    category: "Mental",
    proofType: "text"
  },
  {
    id: 5,
    title: "Digital Detox",
    description: "No social media for 1 hour today",
    points: 20,
    category: "Digital Wellness",
    proofType: "screenshot"
  }
];

const WellnessTracker = () => {
  const [points, setPoints] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [dailyTask, setDailyTask] = useState(null);
  const [proofSubmission, setProofSubmission] = useState(null);
  const [taskSubmitted, setTaskSubmitted] = useState(false);

  useEffect(() => {
    const randomTask = wellnessTasks[Math.floor(Math.random() * wellnessTasks.length)];
    setDailyTask(randomTask);
    setTaskSubmitted(false);
    setProofSubmission(null);
  }, []);

  const handleProofSubmission = () => {
    if (proofSubmission && dailyTask) {
      setPoints(prevPoints => prevPoints + dailyTask.points);
      setCompletedTasks([...completedTasks, dailyTask.id]);
      setTaskSubmitted(true);
    }
  };

  const renderProofSubmission = () => {
    if (dailyTask?.proofType === 'image') {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Stretch Proof (Image)
          </label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setProofSubmission(e.target.files[0])}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>
      );
    } else if (dailyTask?.proofType === 'text') {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Describe Your Task Completion
          </label>
          <textarea 
            rows={3}
            onChange={(e) => setProofSubmission(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md"
            placeholder="Share your experience..."
          />
        </div>
      );
    } else if (dailyTask?.proofType === 'screenshot') {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Screen Time Proof (Screenshot)
          </label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setProofSubmission(e.target.files[0])}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>
      );
    }
  };

  const getLevel = () => {
    if (points < 50) return "Wellness Newbie";
    if (points < 100) return "Wellness Warrior";
    if (points < 200) return "Wellness Champion";
    return "Wellness Master";
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-600">Daily Wellness Challenge</h1>
        <div className="flex items-center">
          <Star className="text-yellow-500 mr-2" />
          <span className="font-semibold">{points} Points</span>
        </div>
      </div>

      {dailyTask && !taskSubmitted && (
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <div className="flex items-center mb-3">
            <Activity className="text-green-600 mr-3" />
            <h2 className="text-xl font-semibold">{dailyTask.title}</h2>
          </div>
          <p className="text-gray-600 mb-4">{dailyTask.description}</p>
          
          <div className="mb-4">
            {renderProofSubmission()}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-green-700">+{dailyTask.points} Points</span>
            <button 
              onClick={handleProofSubmission}
              disabled={!proofSubmission}
              className={`px-4 py-2 rounded-full transition ${
                proofSubmission 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center">
                <Upload className="mr-2" size={16} />
                Submit Proof
              </div>
            </button>
          </div>
        </div>
      )}

      {taskSubmitted && (
        <div className="bg-green-100 p-4 rounded-lg mb-4 flex items-center">
          <CheckCircle className="text-green-600 mr-3" />
          <span className="text-green-800">Task Completed! Points Earned!</span>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <Award className="text-blue-600 mr-3" />
          <h3 className="text-lg font-semibold">Your Wellness Level</h3>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">{getLevel()}</span>
          <div className="flex items-center">
            <Smile className="text-yellow-500 mr-2" />
            <Zap className="text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessTracker;
