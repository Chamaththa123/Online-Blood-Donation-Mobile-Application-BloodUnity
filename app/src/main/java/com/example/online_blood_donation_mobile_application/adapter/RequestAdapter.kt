package com.example.online_blood_donation_mobile_application.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.online_blood_donation_mobile_application.R
import com.example.online_blood_donation_mobile_application.models.AmbulanceModel
import com.example.online_blood_donation_mobile_application.models.RequestorModel

class RequestAdapter(private val requestList: ArrayList<RequestorModel>) :
    RecyclerView.Adapter<RequestAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.request_list, parent, false)
        return ViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val currentrequest = requestList[position]
        holder.tvBloodGroup.text = currentrequest.rgroup
        holder.tvRequestorName.text = currentrequest.rname
        holder.tv_Status.text = currentrequest.status
    }

    override fun getItemCount(): Int {
        return requestList.size
    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        val tvBloodGroup : TextView = itemView.findViewById(R.id.tvBloodGroup)
        val tvRequestorName : TextView = itemView.findViewById(R.id.tvRequestorName)
        val tv_Status : TextView = itemView.findViewById(R.id.tv_Status)

    }
}