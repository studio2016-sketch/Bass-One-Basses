"use client";
import {useEffect} from "react";
import {readBookingAttribution} from "../lib/booking-attribution";
export default function BookingAttribution(){useEffect(()=>{readBookingAttribution();},[]);return null;}
