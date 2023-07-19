package com.example.online_blood_donation_mobile_application.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.online_blood_donation_mobile_application.R
import com.example.online_blood_donation_mobile_application.models.AmbulanceModel

class AmbulanceAdapter(private val ambulanceList: ArrayList<AmbulanceModel>) :
    RecyclerView.Adapter<AmbulanceAdapter.ViewHolder>(){

    private lateinit var mListener: onItemClickListener

    interface onItemClickListener{
        fun onItemClick(position: Int)
    }

    fun setOnItemClickListener(clickListener: onItemClickListener){
        mListener = clickListener
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.ambulance_list, parent, false)
        return ViewHolder(itemView,mListener)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val currentAmbulance = ambulanceList[position]
        holder.tvHospitalName.text = currentAmbulance.name
        holder.tvLocation.text = currentAmbulance.location
        holder.tvContact.text = currentAmbulance.number
    }

    override fun getItemCount(): Int {
        return ambulanceList.size
    }

//    fun setOnItemClickListener(onItemClickListener: DonorAdapter.onItemClickListener) {
//
//    }

    class ViewHolder(itemView: View, clickListener: onItemClickListener) : RecyclerView.ViewHolder(itemView) {

        val tvHospitalName : TextView = itemView.findViewById(R.id.tvHospitalName)
        val tvLocation : TextView = itemView.findViewById(R.id.etALocation)
        val tvContact : TextView = itemView.findViewById(R.id.tvContact)

        init {
            itemView.setOnClickListener {
                clickListener.onItemClick(adapterPosition)
            }
        }

    }
}