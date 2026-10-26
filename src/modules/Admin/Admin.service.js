
import { User } from "../auth/auth.model.js";
import { Movies } from "../Movies/movie.model.js";
import { Tickets } from "../Tickets/ticket.model.js";



export const getDashboardStats = async () => {
  const totalUsers = await User.countDocuments();
  const totalMovies = await Movies.countDocuments();
  const totaltickets = await Tickets.countDocuments()

  return {
    totalUsers,
    totalMovies,
    totaltickets,
  };
};


export const getUsers = async () => {
  return await User.find({role:{$ne:"admin"}})
};

export const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

export const getMovies = async () => {
  return await Movies.find();
};

export const addMovie = async (movieData) => {
  return await Movies.create(movieData);
};

export const deleteMovie = async (movieId) => {
  return await Movies.findByIdAndDelete(movieId);
};


export const getBookingsService = async (ticketID) => {
  const tickets=  await Tickets.find(ticketID);
  await Movies.populate(tickets,"movieId")
  await User.populate(tickets,"userId")
  return tickets;
}