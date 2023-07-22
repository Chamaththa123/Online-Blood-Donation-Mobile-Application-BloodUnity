package com.example.online_blood_donation_mobile_application.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.online_blood_donation_mobile_application.R
import com.example.online_blood_donation_mobile_application.models.AmbulanceModel

class AmbulanceAdapterII(private val ambulanceListII: ArrayList<AmbulanceModel>) :
    RecyclerView.Adapter<AmbulanceAdapterII.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.ambulance_list, parent, false)
        return ViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val currentAmbulance = ambulanceListII[position]
        holder.tvHospitalName.text = currentAmbulance.name
        holder.tvLocation.text = currentAmbulance.location
        holder.tvContact.text = currentAmbulance.number
    }

    override fun getItemCount(): Int {
        return ambulanceListII.size
    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        val tvHospitalName : TextView = itemView.findViewById(R.id.tvHospitalName)
        val tvLocation : TextView = itemView.findViewById(R.id.etALocation)
        val tvContact : TextView = itemView.findViewById(R.id.tvContact)

    }
}