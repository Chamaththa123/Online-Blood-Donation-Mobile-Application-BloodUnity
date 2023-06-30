package com.example.online_blood_donation_mobile_application.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.online_blood_donation_mobile_application.R
import com.example.online_blood_donation_mobile_application.models.DonatorModel

class DonorAdapter(private val donorList: ArrayList<DonatorModel>) :
    RecyclerView.Adapter<DonorAdapter.ViewHolder>() {

//    private lateinit var mListener: onItemClickListener

//    interface onItemClickListener{
//        fun onItemClick(position: Int)
//    }

//    fun setOnItemClickListener(clickListener: onItemClickListener){
//        mListener = clickListener
//    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.donar_list, parent, false)
        return ViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val currentDonor = donorList[position]
        holder.tvDonorName.text = currentDonor.name
    }

    override fun getItemCount(): Int {
        return donorList.size
    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        val tvDonorName : TextView = itemView.findViewById(R.id.tvDonorName)

//        init {
//            itemView.setOnClickListener {
//                clickListener.onItemClick(adapterPosition)
//            }
//        }

    }

}