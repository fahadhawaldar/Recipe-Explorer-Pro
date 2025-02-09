import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { mealDbAPI } from "../utils/constants";
import { RecipeTypes } from "../types";
import { router } from "expo-router";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const RecipeNotificationManager = () => {
  const [notificationPermission, setNotificationPermission] = useState(false);

  // Step 2: Set up notifications when component mounts
  useEffect(() => {
    setupNotifications();
  }, []);

  // Step 3: Request permissions and schedule notifications
  const setupNotifications = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      setNotificationPermission(status === "granted");

      if (status === "granted") {
        // Clear existing notifications
        await Notifications.cancelAllScheduledNotificationsAsync();
        // Schedule new notification
        await scheduleDailyNotification();
      }
    } catch (error) {
      console.error("Error setting up notifications:", error);
    }
  };

  // Step 4: Function to fetch random recipe from API
  const fetchRandomRecipe = async () => {
    try {
      const response = await axios.get(
        mealDbAPI + `/${Math.floor(Math.random() * 30) + 1}`
      );
      if (!response.data) {
        throw new Error("No recipes found");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching recipe:", error);
      return {
        id: "fallback",
        title: "Chef's Special",
        description: "Check our app for today's special recipe!",
      };
    }
  };

  // Step 5: Schedule daily notification
  const scheduleDailyNotification = async () => {
    const recipe: RecipeTypes | any = await fetchRandomRecipe();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🍳 Today's Recipe Suggestion",
        body: `Try making ${recipe?.name}! \n ${recipe?.instructions.join(
          "\n"
        )}`,
        data: { recipeId: recipe.id },
      },
      trigger: {
        hour: 12,
        minute: 57,
        repeats: true,
        type: "daily",
      } as Notifications.NotificationTriggerInput,
    });

    await AsyncStorage.setItem("lastSuggestedRecipe", JSON.stringify(recipe));
  };

  // Step 6: Handle notification taps
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const recipeId = response.notification.request.content.data.recipeId;
        // Navigate to recipe details or handle tap
        router.push(`/${recipeId}`);
      }
    );

    return () => subscription.remove();
  }, []);

  return null;
};
