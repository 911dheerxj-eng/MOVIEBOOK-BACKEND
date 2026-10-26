import {getDashboardStats,getUsers,deleteUser,getMovies,addMovie,deleteMovie, getBookingsService,} from "./Admin.service.js";


export const dashboard = async (req, res) => {
  try {
    const data = await getDashboardStats();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const users = async (req, res) => {
  try {
    const data = await getUsers();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const removeUser = async (req, res) => {
  try {
    const data = await deleteUser(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const movies = async (req, res) => {
  try {
    const data = await getMovies();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const createMovie = async (req, res) => {
  try {
    const data = await addMovie(req.body);
    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const removeMovie = async (req, res) => {
  try {
    const data = await deleteMovie(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getBookingsController = async (req,res)=>{
   try {
    const data = await getBookingsService();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
