// RecipeForm.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  useColorScheme,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StyledView from "@/src/components/StyledView";
import StyledText from "@/src/components/StyledText";
import { Ionicons } from "@expo/vector-icons";
import { RecipeTypes } from "@/src/types";
import { recipeService } from "@/src/services/recipeService";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "@/src/store/slices/recipesSlice";
import { router } from "expo-router";
import { accentColor } from "@/src/utils/color";

const RecipeForm = () => {
  const user = useSelector((state: any) => state.auth.user);
  const isDark = useSelector((state: any) => state.appSettings.darkMode);
  const color = isDark ? "#fff" : "#000";
  const dispatch = useDispatch();
  const [ingredientText, setIngredientText] = useState("");

  const [instructionText, setInstructionText] = useState("");
  const defaultRecipe = {
    id: Math.floor(Math.random() * 1000),
    name: "",
    ingredients: [],
    instructions: [],
    prepTimeMinutes: Math.floor(Math.random() * 20),
    cookTimeMinutes: Math.floor(Math.random() * 40),
    servings: Math.floor(Math.random() * 10),
    difficulty: "Easy",
    cuisine: "Indian",
    caloriesPerServing: 200,
    tags: ["Created by Me"],
    userId: user.uid,
    image: "",
    rating: 0,
    reviewCount: 0,
    mealType: ["Lunch"],
  };
  const [recipe, setRecipe] = useState<RecipeTypes>(defaultRecipe);

  const addIngredient = () => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ingredientText],
    }));
    setIngredientText("");
  };

  const addInstruction = () => {
    setRecipe((prev) => ({
      ...prev,
      instructions: [...prev.instructions, instructionText],
    }));
    setInstructionText("");
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to upload images!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setRecipe({ ...recipe, image: result.assets[0].uri });
    }
  };

  const saveRecipe = async () => {
    try {
      // Validation;
      if (
        recipe.name.trim() === "" ||
        recipe.instructions.length === 0 ||
        recipe.ingredients.length === 0 ||
        recipe.image === ""
      ) {
        Alert.alert("Error", "Please fill in all required fields");
        return;
      }

      const newRecipe = {
        ...recipe,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      dispatch(addRecipe(newRecipe));
      setRecipe(defaultRecipe);

      Alert.alert("Success", "Recipe saved successfully!");
      router.back();
    } catch (error) {
      console.error("Error saving recipe:", error);
      Alert.alert("Error", "Failed to save recipe");
    }
  };

  return (
    <StyledView style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 20 }} onScroll={Keyboard.dismiss}>
        <StyledText style={styles.label}>Recipe Name *</StyledText>
        <TextInput
          style={[styles.input, { color }]}
          value={recipe.name}
          onChangeText={(text) => setRecipe({ ...recipe, name: text })}
          placeholder="Enter recipe name"
        />

        <StyledText style={styles.label}>Instructions *</StyledText>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
          }}
        >
          <TextInput
            style={[styles.input, { color, flex: 1 }]}
            value={instructionText}
            onChangeText={(text) => setInstructionText(text)}
            placeholder="Enter instruction"
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="add-circle"
              size={24}
              color={accentColor}
              onPress={addInstruction}
            />
          </View>
        </View>
        <ScrollView nestedScrollEnabled style={styles.instructionList}>
          {recipe.instructions.map((instruction, index) => (
            <View key={index} style={styles.wrapper}>
              <StyledText style={styles.instructionItem}>
                {index + 1}.
              </StyledText>
              <StyledText style={styles.instructionItem}>
                {instruction}
              </StyledText>
            </View>
          ))}
        </ScrollView>

        <StyledText style={styles.label}>Ingredients *</StyledText>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
          }}
        >
          <TextInput
            style={[styles.input, { color, flex: 1 }]}
            value={ingredientText}
            onChangeText={(text) => setIngredientText(text)}
            placeholder="Enter ingredient"
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="add-circle"
              size={24}
              color={accentColor}
              onPress={addIngredient}
            />
          </View>
        </View>
        <ScrollView nestedScrollEnabled style={styles.ingredientList}>
          {recipe.ingredients.map((ingredient, index) => (
            <StyledText key={index} style={styles.instructionItem}>
              {index + 1}. {ingredient}
            </StyledText>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <StyledText style={styles.imageButtonText}>
            {recipe.image ? "Change Image" : "Add Image"}
          </StyledText>
        </TouchableOpacity>

        {recipe.image && (
          <Image source={{ uri: recipe.image }} style={styles.preview} />
        )}

        <TouchableOpacity style={styles.saveButton} onPress={saveRecipe}>
          <StyledText style={styles.saveButtonText}>Save Recipe</StyledText>
        </TouchableOpacity>
      </ScrollView>
    </StyledView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    // marginBottom: 15,
    fontSize: 16,
  },
  instructionList: {
    maxHeight: 100,
    overflow: "scroll",
    marginBottom: 15,
  },
  instructionItem: {
    paddingVertical: 5,
    fontSize: 16,
    borderRadius: 8,
    // backgroundColor: "#f0f0f0",
    marginBottom: 5,
  },
  ingredientList: {
    maxHeight: 100,
    overflow: "scroll",
    marginBottom: 15,
  },
  imageButton: {
    // backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 15,
  },
  imageButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  preview: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: accentColor,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  wrapper: {
    flexDirection: "row",
    gap: 1,
    paddingHorizontal: 10,
  },
});

export default RecipeForm;
