const API_URL = "http://localhost:5000/api";


//REGISTER API

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};


//LOGIN API

export const loginUser = async (
  email: string,
  password: string,
) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};


//GENERATE SUGGESTIONS API

export interface RecipeSuggestion {
  title: string;
  description: string;
  cuisine: string;
  mealType: string;
  diet: string;
  totalTime: number;
  calories: number;
}

export const getRecipeSuggestions = async (
  recipeRequest: {
    ingredients: string[];
    gadgets: string[];
    cuisine: string;
    mealType: string;
    diet: string;
    maxTime: number;
    servings: number;
  },
  token: string,
): Promise<RecipeSuggestion[]> => {
  const response = await fetch(
    `${API_URL}/recipes/suggestions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recipeRequest),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to generate recipe suggestions",
    );
  }

  return data.suggestions;
};



//GENERATE RECIPE API

export const generateRecipe = async (
  recipeRequest: {
    ingredients: string[];
    gadgets: string[];
    cuisine: string;
    mealType: string;
    diet: string;
    maxTime: number;
    servings: number;
    selectedRecipe?: string;
  },
  token: string,
) => {
  const response = await fetch(
    `${API_URL}/recipes/generate`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(recipeRequest),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to generate recipe",
    );
  }

  return data;
};


// SAVE RECIPE API

export const saveRecipe = async (
  recipe: unknown,
  token: string,
) => {
  const response = await fetch(
    `${API_URL}/recipes/save`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(recipe),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to save recipe",
    );
  }

  return data;
};


//GET SAVED RECIPES API

export const getSavedRecipes = async (
  token: string,
) => {
  const response = await fetch(
    `${API_URL}/recipes/saved`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch saved recipes",
    );
  }

  return data;
};


//DELETE RECIPE API

export const deleteRecipe = async (
  recipeId: string,
  token: string,
) => {
  const response = await fetch(
    `${API_URL}/recipes/${recipeId}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete recipe",
    );
  }

  return data;
};