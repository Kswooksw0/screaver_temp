import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../supabaseClient"; // Correctly import the client
import marmotClose from "../../assets/images/screaming_marmot_close.png";
import marmotOpen from "../../assets/images/screaming_marmot_open.png";
import screamSound from "../../assets/media/screamot_scream.mp4";
import styles from "./HomePage.module.css";
import { Title } from "../../components/Title/Title";
import { Socials } from "../../components/Socials/Socials";

const HomePage = () => {
  const [isMouthOpen, setMouthOpen] = useState(false);
  const [counter, setCounter] = useState(0); // Local user counter
  const [globalCounter, setGlobalCounter] = useState(0); // Global scream counter
  const [shouldJiggle, setShouldJiggle] = useState(false);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);

  // Fetch global scream counter from Supabase
  useEffect(() => {
    const fetchGlobalCounter = async () => {
      const { data, error } = await supabase
        .from("scream_counter")
        .select("total_screams")
        .eq("id", 1)
        .single();

      if (error) {
        console.error("Error fetching global counter:", error);
      } else if (data) {
        setGlobalCounter(data.total_screams); // Set global counter from DB
      }
    };

    // Fetch initial value
    fetchGlobalCounter();

    // Subscribe to real-time updates for the global scream counter
    const screamSubscription = supabase
      .channel("scream_counter_channel") // New channel-based subscription
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "scream_counter" },
        (payload) => {
          setGlobalCounter(payload.new.total_screams); // Real-time updates
        }
      )
      .subscribe();

    // Clean up subscription on component unmount
    return () => {
      supabase.removeChannel(screamSubscription);
    };
  }, []);

  // Jiggle animation logic
  useEffect(() => {
    let timer;
    if (shouldJiggle) {
      const countElement = document.querySelector(`.${styles.count}`);
      countElement.classList.add(styles.jiggle);

      // Set the timeout to remove the jiggle class after 500ms
      timer = setTimeout(() => {
        countElement.classList.remove(styles.jiggle);
        setShouldJiggle(false);
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [shouldJiggle]);

  // Handle the click action and audio
  const handleClick = async () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((error) => {
      alert("Playback failed:", error);
    });

    if (!isMouthOpen) {
      setCounter(counter + 1);
      setShouldJiggle(true);

      // Increment global scream count in Supabase
      const { error } = await supabase.rpc("increment_counter", {}); // Call Supabase function to increment

      if (error) {
        console.error("Error updating global counter:", error);
      }
    }

    setMouthOpen(true);

    timeoutRef.current = setTimeout(() => {
      setMouthOpen(false);
    }, 250);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Clean up on unmount
      }
    };
  }, []);

  return (
    <div className={styles.container} onClick={handleClick}>
      {/* Marmot image rendering with audio */}
      <img
        src={isMouthOpen ? marmotOpen : marmotClose}
        alt="Screaming Marmot"
        className={styles.image}
      />
      <audio ref={audioRef} src={screamSound} preload="auto" />

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.topHalf}>
          <Title />
        </div>
        <div className={styles.bottomHalf}>
          <Socials />
        </div>
      </div>

      {/* Local counter section (for current user) (separate from mainContent) */}
      <div className={styles.counterContainer}>
        <h1 className={styles.count}>{counter}</h1>
      </div>

      {/* Global counter section */}
      <div className={styles.globalCounterContainer}>
        <h2 className={styles.globalCount}>Total Screams: {globalCounter}</h2>
      </div>
    </div>
  );
};

export default HomePage;

// When you click and call increment_counter, the total_screams value in the database is incremented.
// This database change emits a 'postgres_changes' event.
// Your subscription listens for this event and triggers the callback function.
// The callback function receives the new data (payload.new.total_screams) and updates the globalCounter state using setGlobalCounter.
// React re-renders the component with the updated globalCounter, showing the new total screams immediately.

/* Visualization of the Flow */

// 1. Component Mounts:

//   Fetches initial global counter.
//   Subscribes to real-time updates.

// 2. User Clicks:

//   Local counter increments (setCounter).
//   Calls RPC to increment total_screams in the database.

// 3. Database Updates:

//   total_screams is incremented in the database.

// 4. Real-time Event Emitted:

//   'UPDATE' event is emitted by Supabase.

// 5. Subscription Callback Fires:

//   Receives new total_screams value.
//   Updates globalCounter state (setGlobalCounter).

// 6. Component Re-renders:

//   Displays updated globalCounter.





/* WHAT THE .CHANNEL() FUNCTION MEANS */

// The abstraction created by .channel('scream_counter_channel') is only temporary and tied to the lifecycle of the React component (in this case, HomePage.jsx).

// What happens when the component unmounts or the user navigates away?
// When the Component Unmounts or User Navigates Away:

// The subscription to the real-time changes via .channel() is active as long as the component is mounted.
// In your current implementation, when the HomePage.jsx component unmounts (e.g., when the user navigates to another page using the router or closes the browser), the subscription is removed. This happens because you call supabase.removeChannel(screamSubscription) in the cleanup function inside the useEffect hook.
// This ensures that once the user leaves the page, the WebSocket connection tied to the scream_counter_channel is closed and no longer consumes resources.
// Browser Session or Tab Closure:

// If the user closes the browser tab or the session ends, the WebSocket connection is also terminated. The subscription is automatically cleaned up by the browser since the connection is no longer active.

// Summary:
// Temporary: The WebSocket subscription via .channel() is temporary and tied to the component's lifecycle.
// Cleanup: It is removed when the component unmounts (on page navigation) or when the browser session ends (closing the tab or session).






