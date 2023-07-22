package com.example.online_blood_donation_mobile_application.activities

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.online_blood_donation_mobile_application.R
import com.example.online_blood_donation_mobile_application.adapter.AmbulanceAdapter
import com.example.online_blood_donation_mobile_application.adapter.AmbulanceAdapterII
import com.example.online_blood_donation_mobile_application.models.AmbulanceModel
import com.google.firebase.database.*

class Ambulance : AppCompatActivity() {

    private lateinit var ambulanceRecyclerView: RecyclerView
    private lateinit var tvLoadingData: TextView
    private lateinit var ambulanceListII: ArrayList<AmbulanceModel>
    private lateinit var dbRef: DatabaseReference

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_ambulance)

        val back = findViewById<ImageView>(R.id.imageView12)

        back.setOnClickListener {
            val intent = Intent(this, Home::class.java)
            startActivity(intent)
        }
        ambulanceRecyclerView = findViewById(R.id.rvAmbulance)
        ambulanceRecyclerView.layoutManager = LinearLayoutManager(this)
        ambulanceRecyclerView.setHasFixedSize(true)
        tvLoadingData = findViewById(R.id.tvLoadingData)

        ambulanceListII = arrayListOf<AmbulanceModel>()

        getAmbulanceData()
    }
    private fun getAmbulanceData() {

        ambulanceRecyclerView.visibility = View.GONE
        tvLoadingData.visibility = View.VISIBLE

        dbRef = FirebaseDatabase.getInstance().getReference("Ambulance")

        dbRef.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                ambulanceListII.clear()
                if (snapshot.exists()){
                    for (empSnap in snapshot.children){
                        val ambulanceData = empSnap.getValue(AmbulanceModel::class.java)
                        ambulanceListII.add(ambulanceData!!)
                    }
                    val mAdapter = AmbulanceAdapterII(ambulanceListII)
                    ambulanceRecyclerView.adapter = mAdapter

                    ambulanceRecyclerView.visibility = View.VISIBLE
                    tvLoadingData.visibility = View.GONE
                }
            }

            override fun onCancelled(error: DatabaseError) {
                TODO("Not yet implemented")
            }

        })
    }
}